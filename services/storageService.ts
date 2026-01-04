import { supabase } from './supabaseClient';

const BASE_IMAGES_BUCKET = 'base-images';
const GENERATED_DESIGNS_BUCKET = 'generated-designs';

export interface BaseImage {
  id: string;
  url: string;
  path: string;
  created_at: string;
}

export interface SavedDesign {
  id: string;
  user_id: string;
  base_image_url: string;
  generated_image_url: string;
  prompt: string;
  created_at: string;
}

// Convert base64 to Blob
function base64ToBlob(base64: string): Blob {
  const parts = base64.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const byteString = atob(parts[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([uint8Array], { type: mime });
}

// Upload base image to storage
export async function uploadBaseImage(userId: string, base64Image: string): Promise<string | null> {
  try {
    const blob = base64ToBlob(base64Image);
    const fileName = `${userId}/${Date.now()}.png`;
    
    const { data, error } = await supabase.storage
      .from(BASE_IMAGES_BUCKET)
      .upload(fileName, blob, {
        contentType: 'image/png',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading base image:', error);
      return null;
    }
    
    const { data: urlData } = supabase.storage
      .from(BASE_IMAGES_BUCKET)
      .getPublicUrl(data.path);
    
    return urlData.publicUrl;
  } catch (err) {
    console.error('Error in uploadBaseImage:', err);
    return null;
  }
}

// Convert URL to Blob by fetching the image
async function urlToBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  return await response.blob();
}

// Upload generated design to storage and save metadata
export async function saveGeneratedDesign(
  userId: string,
  imageSource: string, // Can be base64 or URL
  baseImageUrl: string,
  prompt: string
): Promise<SavedDesign | null> {
  try {
    // Handle both base64 and URL sources
    let blob: Blob;
    if (imageSource.startsWith('data:')) {
      blob = base64ToBlob(imageSource);
    } else {
      // It's a URL, fetch and convert to blob
      blob = await urlToBlob(imageSource);
    }
    const fileName = `${userId}/${Date.now()}.png`;
    
    const { data, error } = await supabase.storage
      .from(GENERATED_DESIGNS_BUCKET)
      .upload(fileName, blob, {
        contentType: 'image/png',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading generated design:', error);
      return null;
    }
    
    const { data: urlData } = supabase.storage
      .from(GENERATED_DESIGNS_BUCKET)
      .getPublicUrl(data.path);
    
    // Save metadata to database
    const { data: designData, error: dbError } = await supabase
      .from('user_designs')
      .insert({
        user_id: userId,
        base_image_url: baseImageUrl,
        generated_image_url: urlData.publicUrl,
        prompt: prompt
      })
      .select()
      .single();
    
    if (dbError) {
      console.error('Error saving design metadata:', dbError);
      return null;
    }
    
    return designData as SavedDesign;
  } catch (err) {
    console.error('Error in saveGeneratedDesign:', err);
    return null;
  }
}

// Get user's base images from storage
export async function getUserBaseImages(userId: string): Promise<BaseImage[]> {
  try {
    const { data, error } = await supabase.storage
      .from(BASE_IMAGES_BUCKET)
      .list(userId, {
        limit: 20,
        sortBy: { column: 'created_at', order: 'desc' }
      });
    
    if (error) {
      console.error('Error fetching base images:', error);
      return [];
    }
    
    return data
      .filter(file => file.name !== '.emptyFolderPlaceholder')
      .map(file => {
        const { data: urlData } = supabase.storage
          .from(BASE_IMAGES_BUCKET)
          .getPublicUrl(`${userId}/${file.name}`);
        
        return {
          id: file.id,
          url: urlData.publicUrl,
          path: `${userId}/${file.name}`,
          created_at: file.created_at
        };
      });
  } catch (err) {
    console.error('Error in getUserBaseImages:', err);
    return [];
  }
}

// Get user's generated designs from database
export async function getUserGeneratedDesigns(userId: string): Promise<SavedDesign[]> {
  try {
    const { data, error } = await supabase
      .from('user_designs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);
    
    if (error) {
      console.error('Error fetching generated designs:', error);
      return [];
    }
    
    return data as SavedDesign[];
  } catch (err) {
    console.error('Error in getUserGeneratedDesigns:', err);
    return [];
  }
}

// Delete a base image
export async function deleteBaseImage(userId: string, path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(BASE_IMAGES_BUCKET)
      .remove([path]);
    
    if (error) {
      console.error('Error deleting base image:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error in deleteBaseImage:', err);
    return false;
  }
}

// Delete a generated design
export async function deleteGeneratedDesign(designId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_designs')
      .delete()
      .eq('id', designId);
    
    if (error) {
      console.error('Error deleting design:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error in deleteGeneratedDesign:', err);
    return false;
  }
}
