
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Dropzone from './components/Dropzone';
import HistoryGallery from './components/HistoryGallery';
import { AppState, GenerationRecord } from './types';
import { editFashionImage } from './services/geminiService';

const INITIAL_PROMPTS = [
  "Change the outfit to a vintage Chanel tweed suit in pastel pink.",
  "Swap the shirt for a sleek charcoal grey turtleneck sweater.",
  "Replace current clothes with a bohemian floral maxi dress.",
  "Style with high-end streetwear: oversized hoodie and techwear pants.",
  "Dress the subject in a classic black tuxedo with a velvet bowtie."
];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    sourceImage: null,
    referenceImage: null,
    isGenerating: false,
    prompt: '',
    history: [],
    currentResult: null,
    error: null
  });

  const handleGenerate = async () => {
    if (!state.sourceImage || !state.prompt) {
      setState(prev => ({ ...prev, error: "Please provide a photo and a description." }));
      return;
    }

    setState(prev => ({ ...prev, isGenerating: true, error: null }));

    try {
      const resultUrl = await editFashionImage(
        state.sourceImage, 
        state.prompt, 
        state.referenceImage || undefined
      );

      const newRecord: GenerationRecord = {
        id: Date.now().toString(),
        sourceUrl: state.sourceImage,
        resultUrl,
        prompt: state.prompt,
        timestamp: Date.now()
      };

      setState(prev => ({
        ...prev,
        isGenerating: false,
        currentResult: resultUrl,
        history: [newRecord, ...prev.history].slice(0, 20)
      }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isGenerating: false, 
        error: err.message || "Something went wrong while generating. Please try again." 
      }));
    }
  };

  const handleClear = () => {
    setState(prev => ({
      ...prev,
      sourceImage: null,
      referenceImage: null,
      currentResult: null,
      prompt: '',
      error: null
    }));
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-indigo-500/30">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">1. Upload Subject</h2>
                <button 
                  onClick={handleClear}
                  className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
                >
                  <i className="fa-solid fa-rotate-left"></i> Reset
                </button>
              </div>
              <Dropzone 
                label="Source Image" 
                icon="fa-user" 
                previewUrl={state.sourceImage}
                onImageSelected={(base64) => setState(prev => ({ ...prev, sourceImage: base64, currentResult: null }))}
              />
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed italic">
                Pro tip: Use a clear photo with the full upper body visible for best results. Face identity will be preserved.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-4">2. Define Style</h2>
              <div className="space-y-4">
                <div className="relative group">
                  <textarea 
                    value={state.prompt}
                    onChange={(e) => setState(prev => ({ ...prev, prompt: e.target.value }))}
                    placeholder="Describe the new outfit... e.g., 'A navy blue tailored wool coat'"
                    className="w-full h-32 rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                  />
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    {INITIAL_PROMPTS.map((p, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setState(prev => ({ ...prev, prompt: p }))}
                        className="hidden md:block w-6 h-6 rounded-full bg-white/10 hover:bg-indigo-500/50 flex items-center justify-center transition-colors tooltip"
                        title={p}
                      >
                        <i className="fa-solid fa-lightbulb text-[10px] text-gray-300"></i>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-shirt text-indigo-400"></i>
                    Garment Reference (Optional)
                  </h3>
                  <div className="h-40">
                    <Dropzone 
                      label="Style Reference" 
                      icon="fa-image" 
                      previewUrl={state.referenceImage}
                      aspectRatio="h-full"
                      onImageSelected={(base64) => setState(prev => ({ ...prev, referenceImage: base64 }))}
                    />
                  </div>
                </div>

                {state.error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    {state.error}
                  </div>
                )}

                <button 
                  onClick={handleGenerate}
                  disabled={state.isGenerating || !state.sourceImage}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-3 transition-all ${
                    state.isGenerating || !state.sourceImage 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : 'btn-primary'
                  }`}
                >
                  {state.isGenerating ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                      Reimagining...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-sparkles"></i>
                      Generate Outfit
                    </>
                  )}
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Generated Result</h2>
                {state.currentResult && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = state.currentResult!;
                        link.download = `stylediff-${Date.now()}.png`;
                        link.click();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium transition-colors flex items-center gap-2"
                    >
                      <i className="fa-solid fa-download"></i> Save
                    </button>
                    <button 
                      className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-medium transition-colors flex items-center gap-2"
                    >
                      <i className="fa-solid fa-share-nodes"></i> Share
                    </button>
                  </div>
                )}
              </div>

              <div className="relative aspect-[3/4] rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                {state.currentResult ? (
                  <div className="w-full h-full relative group">
                    <img 
                      src={state.currentResult} 
                      alt="Generation Result" 
                      className="w-full h-full object-contain"
                    />
                    {/* Before/After Toggle Overlay (Simplified) */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white border border-white/10">
                      AFTER
                    </div>
                  </div>
                ) : state.isGenerating ? (
                  <div className="text-center p-10">
                    <div className="w-20 h-20 mx-auto mb-6 relative">
                      <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 animate-spin"></div>
                    </div>
                    <h3 className="text-white font-medium mb-2">Analyzing Garments...</h3>
                    <p className="text-gray-500 text-xs max-w-xs mx-auto">
                      Gemini is processing your photo and mapping the new style while preserving your identity.
                    </p>
                  </div>
                ) : (
                  <div className="text-center p-10 opacity-30">
                    <i className="fa-solid fa-wand-magic-sparkles text-6xl mb-6 text-indigo-400"></i>
                    <p className="text-sm font-medium">Your creation will appear here</p>
                  </div>
                )}
              </div>
              
              {state.currentResult && state.sourceImage && (
                <div className="mt-6 flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                  <div className="flex-shrink-0 w-24 h-32 rounded-xl border border-white/10 overflow-hidden opacity-50 hover:opacity-100 transition-opacity">
                    <img src={state.sourceImage} className="w-full h-full object-cover" alt="Source" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[8px] text-center py-1">SOURCE</div>
                  </div>
                  <div className="flex-shrink-0 w-24 h-32 rounded-xl border-2 border-indigo-500 overflow-hidden">
                    <img src={state.currentResult} className="w-full h-full object-cover" alt="Result" />
                    <div className="absolute bottom-0 left-0 right-0 bg-indigo-500 text-[8px] text-center py-1">RESULT</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <HistoryGallery 
          history={state.history} 
          onSelect={(item) => setState(prev => ({ 
            ...prev, 
            currentResult: item.resultUrl, 
            sourceImage: item.sourceUrl,
            prompt: item.prompt 
          }))} 
        />
      </main>

      <footer className="mt-20 py-10 border-t border-white/5 text-center">
        <p className="text-xs text-gray-500">
          Powered by <strong>Gemini 2.5 Flash Image</strong> • StyleDiff Engine v1.0.0
        </p>
      </footer>
    </div>
  );
};

export default App;
