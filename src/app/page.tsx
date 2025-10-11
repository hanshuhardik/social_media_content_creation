// 'use client';

// import { useState, useEffect } from 'react';

// const TONE_OPTIONS = [
//   'Professional',
//   'Casual',
//   'Friendly',
//   'Humorous',
//   'Formal',
//   'Inspirational',
//   'Educational',
//   'Conversational'
// ] as const;

// type ToneOption = typeof TONE_OPTIONS[number];

// interface GeneratePostParams {
//   description: string;
//   platform: string;
//   tone: string;
//   wordLimit?: number;
//   makeThread?: boolean;
//   includeHashtags: boolean;
//   includeEmoji: boolean;
// }

// function Page() {
//   // Client-side only state
//   const [mounted, setMounted] = useState(false);
  
//   // Form states
//   const [description, setDescription] = useState('');
//   const [platform, setPlatform] = useState('twitter');
//   const [makeThread, setMakeThread] = useState(false);
//   const [wordLimit, setWordLimit] = useState(35);
//   const [generatedContent, setGeneratedContent] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [tone, setTone] = useState<ToneOption>('Professional');
//   const [includeHashtags, setIncludeHashtags] = useState(false);
//   const [includeEmoji, setIncludeEmoji] = useState(false);
//   const [postsToGenerate, setPostsToGenerate] = useState(1);

//   // Set mounted state after hydration
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Don't render anything until after hydration
//   if (!mounted) {
//     return null;
//   }

//   const generateSinglePost = async (params: GeneratePostParams) => {
//     const response = await fetch('/api/generate-post', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(params),
//     });
    
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.error || 'Failed to generate post');
//     }
//     return data.content;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setCopied(false);
//     setGeneratedContent([]);
    
//     try {
//       // Create array of promises for parallel execution
//       const generatePromises = Array(postsToGenerate)
//         .fill(null)
//         .map(() => 
//           generateSinglePost({ 
//             description, 
//             platform, 
//             tone,
//             wordLimit: platform === 'linkedin' ? wordLimit : undefined,
//             makeThread,
//             includeHashtags,
//             includeEmoji,
//           })
//         );

//       // Execute all API calls in parallel
//       const results = await Promise.all(generatePromises);
//       setGeneratedContent(results);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = async (content: string) => {
//     try {
//       await navigator.clipboard.writeText(content);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy text:', err);
//     }
//   };

//   return (
//     <main className="min-h-screen relative overflow-hidden" style={{
//       background: 'linear-gradient(135deg, #fcfcfc 0%, #f8f7ff 100%)'
//     }}>
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-5 animate-float" 
//           style={{ background: 'linear-gradient(45deg, #9C27B0, #673AB7)' }}></div>
//         <div className="absolute top-1/4 -right-20 w-60 h-60 rounded-full opacity-5 animate-float-delayed" 
//           style={{ background: 'linear-gradient(45deg, #7E57C2, #5E35B1)' }}></div>
//         <div className="absolute bottom-1/4 -left-20 w-52 h-52 rounded-full opacity-5 animate-float" 
//           style={{ background: 'linear-gradient(45deg, #B388FF, #7C4DFF)' }}></div>
        
//         {/* Floating Emojis */}
//         <div className="absolute top-20 right-[10%] text-4xl opacity-10 animate-float">✨</div>
//         <div className="absolute top-[40%] left-[5%] text-4xl opacity-10 animate-float-delayed">💡</div>
//         <div className="absolute bottom-[30%] right-[15%] text-4xl opacity-10 animate-float">🚀</div>
//         <div className="absolute top-[60%] left-[15%] text-4xl opacity-10 animate-float-delayed">💫</div>
//         <div className="absolute bottom-[10%] right-[5%] text-4xl opacity-10 animate-float">⭐</div>
//       </div>

//       {/* Hero Section */}
//       <div className="relative py-12 px-4">
//         <div className="max-w-5xl mx-auto text-center">
//           <div className="inline-block mb-2 px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 shadow-sm">
//             AI-Powered Social Media Assistant
//           </div>
//           <h1 className="text-5xl font-bold mb-6 text-black bg-clip-text" style={{
//             textShadow: '0 2px 10px rgba(0,0,0,0.05)'
//           }}>
//             Generate social media posts in seconds for free
//           </h1>
//           <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
//             Stay consistent, creative, and productive with our free AI social media post generator.
//           </p>
          
//           {/* Social Media Icons */}
//           <div className="flex justify-center gap-6 mb-12">
//             <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1877F2] hover:opacity-90 transition-all transform hover:-translate-y-1 hover:scale-110">
//               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//               </svg>
//             </div>
//               {/* <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#FF7A00] via-[#FE0362] to-[#D300C5] hover:opacity-90 transition-all transform hover:-translate-y-1 hover:scale-110">
//                 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-1.38-.898.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
//                 </svg>
//               </div> */}
//             <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black hover:opacity-90 transition-all transform hover:-translate-y-1 hover:scale-110">
//               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//               </svg>
//             </div>
//             <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#0A66C2] hover:opacity-90 transition-all transform hover:-translate-y-1 hover:scale-110">
//               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//               </svg>
//             </div>
//             <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E60023] hover:opacity-90 transition-all transform hover:-translate-y-1 hover:scale-110">
//               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
//               </svg>
//             </div>
//             <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FF0000] hover:opacity-90 transition-all transform hover:-translate-y-1 hover:scale-110">
//               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//               </svg>
//             </div>
//               <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#000000] hover:opacity-90 transition-all transform hover:-translate-y-1 hover:scale-110">
//                 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
//                 </svg>
//               </div>
              
//           </div>
//           {/* Generator Form */}
//           <div className="relative pt-4 px-4">
//             <div className="max-w-3xl mx-auto">
//               <form onSubmit={handleSubmit} className="space-y-8 p-8 rounded-2xl shadow-xl bg-white/90 backdrop-blur-md border border-gray-100">
//                 <div>
//                   <label htmlFor="description" className="block text-lg font-medium mb-3 text-black">
//                     What would you like to post about?
//                   </label>
//                   <textarea
//                     id="description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm transition-all border border-gray-200 hover:border-purple-300"
//                     style={{ 
//                       color: '#000000'
//                     }}
//                     rows={4}
//                     placeholder="Enter your post topic or description..."
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="platform" className="block text-lg font-medium mb-3 text-black">
//                       Platform
//                     </label>
//                     <select
//                       id="platform"
//                       value={platform}
//                       onChange={(e) => setPlatform(e.target.value)}
//                       className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm transition-all border border-gray-200 hover:border-purple-300"
//                       style={{ color: '#000000' }}
//                     >
//                       <option value="twitter">X (Twitter)</option>
//                       <option value="linkedin">LinkedIn</option>
//                       <option value="blog">blog</option>
//                       <option value="facebook">Facebook</option>
//                       <option value="instagram">Instagram</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label htmlFor="tone" className="block text-lg font-medium mb-3 text-black">
//                       Tone of Voice
//                     </label>
//                     <select
//                       id="tone"
//                       value={tone}
//                       onChange={(e) => setTone(e.target.value as ToneOption)}
//                       className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm transition-all border border-gray-200 hover:border-purple-300"
//                       style={{ color: '#000000' }}
//                     >
//                       {TONE_OPTIONS.map((t) => (
//                         <option key={t} value={t}>{t}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {platform === 'linkedin' || platform==='blog' && (
//                     <div>
//                       <label htmlFor="wordLimit" className="block text-lg font-medium mb-3 text-black">
//                         Approximate Words
//                       </label>
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="range"
//                           id="wordLimit"
//                           min="10"
//                           max="2500"
//                           value={wordLimit}
//                           onChange={(e) => setWordLimit(Number(e.target.value))}
//                           className="w-full h-2 rounded-lg appearance-none cursor-pointer"
//                           style={{ 
//                             backgroundColor: 'white',
//                             background: 'linear-gradient(to right, gray 0%, gray ' + (wordLimit/2500*100) + '%, gray ' + (wordLimit/2500*100) + '%, gray 100%)',
//                             height: '4px',
//                             border: '1px solid gray'
//                           }}
//                         />
//                         <span className="font-medium min-w-[3rem]" style={{ color: 'black' }}>{wordLimit}</span>
//                       </div>
//                     </div>
//                   )}

//                   <div>
//                     <label htmlFor="postsToGenerate" className="block text-lg font-medium mb-3 text-black">
//                       Number of Variations
//                     </label>
//                     <select
//                       id="postsToGenerate"
//                       value={postsToGenerate}
//                       onChange={(e) => setPostsToGenerate(Number(e.target.value))}
//                       className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm transition-all border border-gray-200 hover:border-purple-300"
//                       style={{ color: '#000000' }}
//                     >
//                       {[1, 2, 3, 4, 5].map((num) => (
//                         <option key={num} value={num}>{num} post{num > 1 ? 's' : ''}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex flex-col md:flex-row gap-6">
//                   {platform === 'twitter' && (
//                     <div className="flex items-center space-x-3">
//                       <label htmlFor="makeThread" className="text-lg font-medium text-black">
//                         Create Thread?
//                       </label>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           id="makeThread"
//                           checked={makeThread}
//                           onChange={(e) => setMakeThread(e.target.checked)}
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" 
//                           style={{ 
//                             backgroundColor: makeThread ? 'gray' : 'white',
//                             borderColor: 'black',
//                             border: '1px solid black'
//                           }}></div>
//                       </label>
//                     </div>
//                   )}

//                   <div className="flex items-center space-x-3">
//                     <label htmlFor="includeHashtags" className="text-lg font-medium text-black">
//                       Add Hashtags
//                     </label>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         id="includeHashtags"
//                         checked={includeHashtags}
//                         onChange={(e) => setIncludeHashtags(e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" 
//                         style={{ 
//                           backgroundColor: includeHashtags ? 'gray' : 'white',
//                           borderColor: 'black',
//                           border: '1px solid black'
//                         }}></div>
//                     </label>
//                   </div>

//                   <div className="flex items-center space-x-3">
//                     <label htmlFor="includeEmoji" className="text-lg font-medium text-black">
//                       Add Emojis
//                     </label>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         id="includeEmoji"
//                         checked={includeEmoji}
//                         onChange={(e) => setIncludeEmoji(e.target.checked)}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" 
//                         style={{ 
//                           backgroundColor: includeEmoji ? 'gray' : 'white',
//                           borderColor: 'black',
//                           border: '1px solid black'
//                         }}></div>
//                     </label>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-4 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center">
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>
//                       Generating...
//                     </div>
//                   ) : (
//                     'Generate Posts'
//                   )}
//                 </button>
//               </form>

//               {generatedContent.length > 0 && mounted && (
//                 <div className="mt-8 space-y-6">
//                   {generatedContent.map((content, index) => (
//                     <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
//                       <div className="flex items-center justify-between p-4 border-b border-gray-100">
//                         <h2 className="text-lg font-semibold text-gray-800">
//                           Generated Post {index + 1}
//                         </h2>
//                         <button
//                           onClick={() => handleCopy(content)}
//                           className="flex items-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800"
//                         >
//                           {copied ? 'Copied! ✓' : 'Copy'}
//                         </button>
//                       </div>
//                       <div className="p-6 whitespace-pre-wrap">{content}</div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>



//         </div>
//       </div>
//     </main>
//   );
// }

// export default Page;


//testing
// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// const TONE_OPTIONS = [
//   "Professional",
//   "Casual",
//   "Friendly",
//   "Humorous",
//   "Inspirational",
//   "Formal",
//   "Educational",
// ] as const

// type ToneOption = (typeof TONE_OPTIONS)[number]

// export default function Page() {
//   const [mounted, setMounted] = useState(false)
//   const [description, setDescription] = useState("")
//   const [platform, setPlatform] = useState("instagram")
//   const [tone, setTone] = useState<ToneOption>("Friendly")
//   const [wordLimit, setWordLimit] = useState(50)
//   const [includeHashtags, setIncludeHashtags] = useState(true)
//   const [includeEmoji, setIncludeEmoji] = useState(true)
//   const [generatedContent, setGeneratedContent] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [image, setImage] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState<string | null>(null)
//   const [copied, setCopied] = useState(false)

//   useEffect(() => setMounted(true), [])
//   if (!mounted) return null

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setImage(file)
//       const reader = new FileReader()
//       reader.onloadend = () => setImagePreview(reader.result as string)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!description && !image && platform !== "blog") {
//       alert("Please provide a description or upload an image.")
//       return
//     }

//     setLoading(true)
//     setGeneratedContent("")

//     let imageBase64 = null
//     if (image) {
//       const reader = new FileReader()
//       const base64Promise = new Promise<string>((resolve) => {
//         reader.onloadend = () => resolve(reader.result as string)
//       })
//       reader.readAsDataURL(image)
//       imageBase64 = await base64Promise
//     }

//     const res = await fetch("/api/generate-post", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         description,
//         platform,
//         tone,
//         wordLimit,
//         includeHashtags,
//         includeEmoji,
//         imageBase64,
//         cleanOutput: true,
//       }),
//     })

//     const data = await res.json()
//     const cleanText = data.content
//       .replace(/[#*_`>~]/g, "")
//       .replace(/\n{3,}/g, "\n\n")
//       .trim()

//     setGeneratedContent(cleanText)
//     setLoading(false)
//   }

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(generatedContent)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   const isImagePlatform =
//     platform === "instagram" || platform === "facebook" || platform === "twitter" || platform === "linkedin"
//   const isBlogPlatform = platform === "blog"

//   return (
//     <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center max-w-3xl mb-12"
//       >
//         <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
//           Social Media Post Generator
//         </h1>
//         <p className="text-lg text-slate-600 leading-relaxed">
//           Generate AI-powered captions, blogs, or posts with intelligent image analysis 🎨
//         </p>
//       </motion.div>

//       {/* Main Form */}
//       <motion.form
//         onSubmit={handleSubmit}
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 space-y-8"
//       >
//         {/* Platform Select */}
//         <div>
//           <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">Platform</label>
//           <select
//             value={platform}
//             onChange={(e) => {
//               setPlatform(e.target.value)
//               setDescription("")
//               setImage(null)
//               setImagePreview(null)
//               setGeneratedContent("")
//               setWordLimit(e.target.value === "blog" ? 1000 : 50)
//             }}
//             className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none text-slate-900 font-medium"
//           >
//             <option value="instagram">Instagram</option>
//             <option value="facebook">Facebook</option>
//             <option value="twitter">X (Twitter)</option>
//             <option value="linkedin">LinkedIn</option>
//             <option value="blog">Blog</option>
//           </select>
//         </div>

//         {/* Image Upload Section */}
//         <AnimatePresence>
//           {isImagePlatform && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.4 }}
//               className="overflow-hidden"
//             >
//               <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">
//                 Upload Image <span className="text-slate-400 normal-case">(optional)</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-medium file:cursor-pointer hover:file:bg-blue-700"
//                 />
//               </div>
//               {imagePreview && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.4 }}
//                   className="mt-6"
//                 >
//                   <img
//                     src={imagePreview || "/placeholder.svg"}
//                     alt="Preview"
//                     className="rounded-2xl shadow-lg w-full max-h-96 object-cover border-4 border-slate-100"
//                   />
//                 </motion.div>
//               )}
//               <p className="text-sm text-slate-500 mt-3 leading-relaxed">
//                 💡 The AI will analyze this image to generate an accurate caption.
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Description Textarea */}
//         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
//           <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">
//             {isBlogPlatform ? "Blog Topic or Description" : "Post Description"}
//             {!isBlogPlatform && <span className="text-slate-400 normal-case"> (optional if image provided)</span>}
//           </label>
//           <textarea
//             placeholder={
//               isBlogPlatform
//                 ? "Enter your blog topic or idea..."
//                 : "Describe your post or leave blank if you uploaded an image."
//             }
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={5}
//             className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none resize-none text-slate-900 placeholder:text-slate-400"
//           />
//         </motion.div>

//         {/* Settings Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Tone Select */}
//           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
//             <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">Tone</label>
//             <select
//               value={tone}
//               onChange={(e) => setTone(e.target.value as ToneOption)}
//               className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none text-slate-900 font-medium"
//             >
//               {TONE_OPTIONS.map((t) => (
//                 <option key={t} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </select>
//           </motion.div>

//           {/* Word Limit Input */}
//           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
//             <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">
//               {isBlogPlatform ? "Target Word Count" : "Word Limit"}
//             </label>
//             <input
//               type="number"
//               value={wordLimit}
//               onChange={(e) => setWordLimit(Number(e.target.value))}
//               min={isBlogPlatform ? 1000 : 20}
//               max={isBlogPlatform ? 2500 : 250}
//               className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none text-slate-900 font-medium"
//             />
//           </motion.div>
//         </div>

//         {/* Toggles */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="flex flex-wrap gap-8 pt-2"
//         >
//           <label className="flex items-center gap-3 text-slate-700 font-medium cursor-pointer group">
//             <input
//               type="checkbox"
//               checked={includeHashtags}
//               onChange={(e) => setIncludeHashtags(e.target.checked)}
//               className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-4 focus:ring-blue-100 cursor-pointer"
//             />
//             <span className="group-hover:text-blue-600 transition-colors">Include Hashtags</span>
//           </label>

//           <label className="flex items-center gap-3 text-slate-700 font-medium cursor-pointer group">
//             <input
//               type="checkbox"
//               checked={includeEmoji}
//               onChange={(e) => setIncludeEmoji(e.target.checked)}
//               className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-4 focus:ring-blue-100 cursor-pointer"
//             />
//             <span className="group-hover:text-blue-600 transition-colors">Include Emojis</span>
//           </label>
//         </motion.div>

//         {/* Submit Button */}
//         <motion.button
//           type="submit"
//           disabled={loading}
//           whileHover={{ scale: loading ? 1 : 1.02 }}
//           whileTap={{ scale: loading ? 1 : 0.98 }}
//           className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? (
//             <span className="flex items-center justify-center gap-3">
//               <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                   fill="none"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 />
//               </svg>
//               Generating...
//             </span>
//           ) : (
//             "Generate Content"
//           )}
//         </motion.button>
//       </motion.form>

//       {/* Generated Content Display */}
//       <AnimatePresence>
//         {generatedContent && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -30 }}
//             transition={{ duration: 0.5 }}
//             className="mt-12 w-full max-w-4xl bg-white shadow-2xl border border-slate-200 rounded-3xl p-8"
//           >
//             <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
//               <h2 className="font-bold text-xl text-slate-900">Generated Content</h2>
//               <motion.button
//                 onClick={handleCopy}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
//                   copied
//                     ? "bg-green-100 text-green-700 border-2 border-green-300"
//                     : "bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600"
//                 }`}
//               >
//                 {copied ? "✓ Copied!" : "Copy"}
//               </motion.button>
//             </div>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="prose prose-slate max-w-none"
//             >
//               <p className="text-slate-800 whitespace-pre-wrap leading-relaxed text-base">{generatedContent}</p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </main>
//   )
// }

//styleing
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Hash,
  AtSign,
  Send,
  Github,
  Globe,
  Mail,
  Share2,
  Rss,
} from "lucide-react"

const TONE_OPTIONS = [
  "Professional",
  "Casual",
  "Friendly",
  "Humorous",
  "Inspirational",
  "Formal",
  "Educational",
] as const

type ToneOption = (typeof TONE_OPTIONS)[number]

const FloatingIcon = ({
  children,
  delay = 0,
  duration = 20,
  startX = 0,
  startY = 0,
  moveX = 50,
  moveY = 100,
  color = "text-blue-400",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  startX?: number
  startY?: number
  moveX?: number
  moveY?: number
  color?: string
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.2, 0.35, 0.2],
      y: [startY, startY - moveY, startY + moveY / 2, startY],
      x: [startX, startX + moveX, startX - moveX / 2, startX],
      rotate: [0, 15, -10, 0],
    }}
    transition={{
      duration,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
    className={`absolute ${color}`}
  >
    {children}
  </motion.div>
)

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const [description, setDescription] = useState("")
  const [platform, setPlatform] = useState("instagram")
  const [tone, setTone] = useState<ToneOption>("Friendly")
  const [wordLimit, setWordLimit] = useState(50)
  const [includeHashtags, setIncludeHashtags] = useState(true)
  const [includeEmoji, setIncludeEmoji] = useState(true)
  const [generatedContent, setGeneratedContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description && !image && platform !== "blog") {
      alert("Please provide a description or upload an image.")
      return
    }

    setLoading(true)
    setGeneratedContent("")

    let imageBase64 = null
    if (image) {
      const reader = new FileReader()
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string)
      })
      reader.readAsDataURL(image)
      imageBase64 = await base64Promise
    }

    const res = await fetch("/api/generate-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        platform,
        tone,
        wordLimit,
        includeHashtags,
        includeEmoji,
        imageBase64,
        cleanOutput: true,
      }),
    })

    const data = await res.json()
    const cleanText = data.content
      .replace(/[#*_`>~]/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim()

    setGeneratedContent(cleanText)
    setLoading(false)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isImagePlatform =
    platform === "instagram" || platform === "facebook" || platform === "twitter" || platform === "linkedin"
  const isBlogPlatform = platform === "blog"

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Left side icons */}
      <FloatingIcon delay={0} duration={25} startX={50} startY={100} moveX={150} moveY={120} color="text-pink-500">
        <Instagram className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon delay={3} duration={22} startX={80} startY={300} moveX={-120} moveY={100} color="text-[#1877F2]">
        <Facebook className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon delay={1.5} duration={28} startX={30} startY={500} moveX={140} moveY={90} color="text-slate-900">
        <Twitter className="w-24 h-24" />
      </FloatingIcon>

      <FloatingIcon delay={4} duration={24} startX={60} startY={200} moveX={-110} moveY={110} color="text-[#0A66C2]">
        <Linkedin className="w-16 h-16" />
      </FloatingIcon>

      <FloatingIcon delay={2} duration={26} startX={40} startY={600} moveX={160} moveY={80} color="text-red-600">
        <Youtube className="w-28 h-28" />
      </FloatingIcon>

      <FloatingIcon delay={5} duration={23} startX={70} startY={400} moveX={-130} moveY={95} color="text-green-500">
        <MessageCircle className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon delay={3.5} duration={27} startX={90} startY={150} moveX={120} moveY={105} color="text-blue-500">
        <Hash className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon delay={1} duration={29} startX={50} startY={700} moveX={-140} moveY={85} color="text-purple-500">
        <AtSign className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon delay={4.5} duration={24} startX={100} startY={350} moveX={135} moveY={100} color="text-[#0088cc]">
        <Send className="w-16 h-16" />
      </FloatingIcon>

      <FloatingIcon delay={2.5} duration={26} startX={45} startY={250} moveX={-125} moveY={115} color="text-slate-800">
        <Github className="w-20 h-20" />
      </FloatingIcon>

      {/* Center-left icons */}
      <FloatingIcon
        delay={1.8}
        duration={25}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={120}
        moveX={140}
        moveY={110}
        color="text-pink-500"
      >
        <Instagram className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon
        delay={3.2}
        duration={27}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={320}
        moveX={-130}
        moveY={95}
        color="text-[#1877F2]"
      >
        <Facebook className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={0.8}
        duration={24}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={520}
        moveX={125}
        moveY={100}
        color="text-red-600"
      >
        <Youtube className="w-26 h-26" />
      </FloatingIcon>

      <FloatingIcon
        delay={4.8}
        duration={28}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={220}
        moveX={-145}
        moveY={105}
        color="text-[#0A66C2]"
      >
        <Linkedin className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon
        delay={2.3}
        duration={26}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={620}
        moveX={135}
        moveY={90}
        color="text-blue-400"
      >
        <Globe className="w-24 h-24" />
      </FloatingIcon>

      <FloatingIcon
        delay={5.3}
        duration={23}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={420}
        moveX={-120}
        moveY={115}
        color="text-orange-500"
      >
        <Rss className="w-20 h-20" />
      </FloatingIcon>

      {/* Center icons */}
      <FloatingIcon
        delay={1.2}
        duration={29}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={180}
        moveX={-150}
        moveY={100}
        color="text-slate-900"
      >
        <Twitter className="w-28 h-28" />
      </FloatingIcon>

      <FloatingIcon
        delay={3.8}
        duration={25}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={380}
        moveX={140}
        moveY={110}
        color="text-green-500"
      >
        <MessageCircle className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon
        delay={0.5}
        duration={27}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={580}
        moveX={-135}
        moveY={95}
        color="text-purple-500"
      >
        <AtSign className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={4.2}
        duration={24}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={280}
        moveX={145}
        moveY={105}
        color="text-blue-500"
      >
        <Hash className="w-24 h-24" />
      </FloatingIcon>

      <FloatingIcon
        delay={2.8}
        duration={26}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={680}
        moveX={-125}
        moveY={90}
        color="text-red-500"
      >
        <Mail className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon
        delay={5.8}
        duration={28}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={480}
        moveX={130}
        moveY={115}
        color="text-[#0088cc]"
      >
        <Send className="w-20 h-20" />
      </FloatingIcon>

      {/* Center-right icons */}
      <FloatingIcon
        delay={1.5}
        duration={26}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={140}
        moveX={-140}
        moveY={105}
        color="text-pink-500"
      >
        <Instagram className="w-24 h-24" />
      </FloatingIcon>

      <FloatingIcon
        delay={3.5}
        duration={24}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={340}
        moveX={130}
        moveY={100}
        color="text-[#1877F2]"
      >
        <Facebook className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon
        delay={0.3}
        duration={28}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={540}
        moveX={-125}
        moveY={95}
        color="text-[#0A66C2]"
      >
        <Linkedin className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={4.3}
        duration={25}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={240}
        moveX={135}
        moveY={110}
        color="text-red-600"
      >
        <Youtube className="w-26 h-26" />
      </FloatingIcon>

      <FloatingIcon
        delay={2.1}
        duration={27}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={640}
        moveX={-145}
        moveY={90}
        color="text-slate-800"
      >
        <Github className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon
        delay={5.1}
        duration={23}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={440}
        moveX={120}
        moveY={115}
        color="text-teal-500"
      >
        <Share2 className="w-18 h-18" />
      </FloatingIcon>

      {/* Right side icons */}
      <FloatingIcon
        delay={0.5}
        duration={26}
        startX={typeof window !== "undefined" ? window.innerWidth - 100 : 1200}
        startY={150}
        moveX={-150}
        moveY={120}
        color="text-pink-500"
      >
        <Instagram className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon
        delay={3.5}
        duration={23}
        startX={typeof window !== "undefined" ? window.innerWidth - 120 : 1200}
        startY={350}
        moveX={120}
        moveY={100}
        color="text-[#1877F2]"
      >
        <Facebook className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={2}
        duration={27}
        startX={typeof window !== "undefined" ? window.innerWidth - 80 : 1200}
        startY={550}
        moveX={-140}
        moveY={90}
        color="text-slate-900"
      >
        <Twitter className="w-26 h-26" />
      </FloatingIcon>

      <FloatingIcon
        delay={4.5}
        duration={25}
        startX={typeof window !== "undefined" ? window.innerWidth - 110 : 1200}
        startY={250}
        moveX={110}
        moveY={110}
        color="text-[#0A66C2]"
      >
        <Linkedin className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon
        delay={2.5}
        duration={24}
        startX={typeof window !== "undefined" ? window.innerWidth - 90 : 1200}
        startY={650}
        moveX={-160}
        moveY={80}
        color="text-red-600"
      >
        <Youtube className="w-30 h-30" />
      </FloatingIcon>

      <FloatingIcon
        delay={5.5}
        duration={28}
        startX={typeof window !== "undefined" ? window.innerWidth - 130 : 1200}
        startY={450}
        moveX={130}
        moveY={95}
        color="text-green-500"
      >
        <MessageCircle className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={4}
        duration={26}
        startX={typeof window !== "undefined" ? window.innerWidth - 100 : 1200}
        startY={200}
        moveX={-120}
        moveY={105}
        color="text-blue-500"
      >
        <Hash className="w-24 h-24" />
      </FloatingIcon>

      <FloatingIcon
        delay={1.5}
        duration={30}
        startX={typeof window !== "undefined" ? window.innerWidth - 70 : 1200}
        startY={750}
        moveX={140}
        moveY={85}
        color="text-purple-500"
      >
        <AtSign className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={5}
        duration={25}
        startX={typeof window !== "undefined" ? window.innerWidth - 140 : 1200}
        startY={400}
        moveX={-135}
        moveY={100}
        color="text-[#0088cc]"
      >
        <Send className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon
        delay={3}
        duration={27}
        startX={typeof window !== "undefined" ? window.innerWidth - 95 : 1200}
        startY={300}
        moveX={125}
        moveY={115}
        color="text-slate-800"
      >
        <Github className="w-22 h-22" />
      </FloatingIcon>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mb-12 relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          Social Media Post Generator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Generate AI-powered captions, blogs, or posts with intelligent image analysis 🎨
        </p>
      </motion.div>

      {/* Main Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 space-y-8 relative z-10"
      >
        {/* Platform Select */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">Platform</label>
          <select
            value={platform}
            onChange={(e) => {
              setPlatform(e.target.value)
              setDescription("")
              setImage(null)
              setImagePreview(null)
              setGeneratedContent("")
              setWordLimit(e.target.value === "blog" ? 1000 : 50)
            }}
            className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none text-slate-900 font-medium"
          >
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">X (Twitter)</option>
            <option value="linkedin">LinkedIn</option>
            <option value="blog">Blog</option>
          </select>
        </div>

        {/* Image Upload Section */}
        <AnimatePresence>
          {isImagePlatform && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">
                Upload Image <span className="text-slate-400 normal-case">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-medium file:cursor-pointer hover:file:bg-blue-700"
                />
              </div>
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6"
                >
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="rounded-2xl shadow-lg w-full max-h-96 object-cover border-4 border-slate-100"
                  />
                </motion.div>
              )}
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                💡 The AI will analyze this image to generate an accurate caption.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Description Textarea */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">
            {isBlogPlatform ? "Blog Topic or Description" : "Post Description"}
            {!isBlogPlatform && <span className="text-slate-400 normal-case"> (optional if image provided)</span>}
          </label>
          <textarea
            placeholder={
              isBlogPlatform
                ? "Enter your blog topic or idea..."
                : "Describe your post or leave blank if you uploaded an image."
            }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none resize-none text-slate-900 placeholder:text-slate-400"
          />
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tone Select */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneOption)}
              className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none text-slate-900 font-medium"
            >
              {TONE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Word Limit Input */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">
              {isBlogPlatform ? "Target Word Count" : "Word Limit"}
            </label>
            <input
              type="number"
              value={wordLimit}
              onChange={(e) => setWordLimit(Number(e.target.value))}
              min={isBlogPlatform ? 1000 : 20}
              max={isBlogPlatform ? 2500 : 250}
              className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none text-slate-900 font-medium"
            />
          </motion.div>
        </div>

        {/* Toggles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-8 pt-2"
        >
          <label className="flex items-center gap-3 text-slate-700 font-medium cursor-pointer group">
            <input
              type="checkbox"
              checked={includeHashtags}
              onChange={(e) => setIncludeHashtags(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-4 focus:ring-blue-100 cursor-pointer"
            />
            <span className="group-hover:text-blue-600 transition-colors">Include Hashtags</span>
          </label>

          <label className="flex items-center gap-3 text-slate-700 font-medium cursor-pointer group">
            <input
              type="checkbox"
              checked={includeEmoji}
              onChange={(e) => setIncludeEmoji(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-4 focus:ring-blue-100 cursor-pointer"
            />
            <span className="group-hover:text-blue-600 transition-colors">Include Emojis</span>
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating...
            </span>
          ) : (
            "Generate Content"
          )}
        </motion.button>
      </motion.form>

      {/* Generated Content Display */}
      <AnimatePresence>
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="mt-12 w-full max-w-4xl bg-white shadow-2xl border border-slate-200 rounded-3xl p-8 relative z-10"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
              <h2 className="font-bold text-xl text-slate-900">Generated Content</h2>
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                  copied
                    ? "bg-green-100 text-green-700 border-2 border-green-300"
                    : "bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600"
                }`}
              >
                {copied ? "✓ Copied!" : "Copy"}
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-slate max-w-none"
            >
              <p className="text-slate-800 whitespace-pre-wrap leading-relaxed text-base">{generatedContent}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}






// make the changes for the image upload

// "use client";

// import React, { useState } from "react";
// import { Copy } from "lucide-react";

// export default function PostGenerator() {
//   const [platform, setPlatform] = useState("instagram");
//   const [description, setDescription] = useState("");
//   const [tone, setTone] = useState("Friendly");
//   const [includeHashtags, setIncludeHashtags] = useState(true);
//   const [includeEmoji, setIncludeEmoji] = useState(true);
//   const [makeThread, setMakeThread] = useState(false);
//   const [wordLimit, setWordLimit] = useState(100);
//   const [numVariations, setNumVariations] = useState(3);
//   const [imageBase64, setImageBase64] = useState<string | null>(null);
//   const [variations, setVariations] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setImageBase64(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setVariations([]);

//     const payload = {
//       platform,
//       description,
//       makeThread,
//       wordLimit,
//       tone,
//       includeHashtags,
//       includeEmoji,
//       imageBase64,
//       numVariations,
//     };

//     const res = await fetch("/api/generate-post", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     setVariations(data.variations || []);
//     setLoading(false);
//   };

//   const copyText = (text: string) => {
//     navigator.clipboard.writeText(text);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8">
//         <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-8">
//           ✨ AI Social Media Post Generator
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Platform */}
//           <div>
//             <label className="font-semibold text-gray-800">Platform</label>
//             <select
//               value={platform}
//               onChange={(e) => setPlatform(e.target.value)}
//               className="w-full border mt-1 rounded-lg p-3 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-indigo-400"
//             >
//               <option value="instagram">Instagram</option>
//               <option value="facebook">Facebook</option>
//               <option value="twitter">Twitter (X)</option>
//               <option value="linkedin">LinkedIn</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="font-semibold text-gray-800">
//               Post Description (optional)
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Describe your post or leave empty to generate from image..."
//               className="w-full border mt-1 rounded-lg p-3 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-indigo-400"
//               rows={3}
//             />
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="font-semibold text-gray-800">Upload Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="w-full border mt-1 p-2 rounded-lg bg-gray-50 text-gray-800"
//             />
//             {imageBase64 && (
//               <img
//                 src={imageBase64}
//                 alt="Preview"
//                 className="mt-3 w-40 h-40 object-cover rounded-xl border"
//               />
//             )}
//           </div>

//           {/* Tone & Word Limit */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="font-semibold text-gray-800">Tone</label>
//               <select
//                 value={tone}
//                 onChange={(e) => setTone(e.target.value)}
//                 className="w-full border mt-1 rounded-lg p-3 bg-gray-50 text-gray-800"
//               >
//                 <option>Friendly</option>
//                 <option>Professional</option>
//                 <option>Witty</option>
//                 <option>Inspirational</option>
//               </select>
//             </div>

//             <div>
//               <label className="font-semibold text-gray-800">Word Limit</label>
//               <input
//                 type="number"
//                 value={wordLimit}
//                 onChange={(e) => setWordLimit(Number(e.target.value))}
//                 className="w-full border mt-1 rounded-lg p-3 bg-gray-50 text-gray-800"
//               />
//             </div>
//           </div>

//           {/* Variations */}
//           <div>
//             <label className="font-semibold text-gray-800">Number of Variations</label>
//             <input
//               type="number"
//               min="1"
//               max="5"
//               value={numVariations}
//               onChange={(e) => setNumVariations(Number(e.target.value))}
//               className="w-full border mt-1 rounded-lg p-3 bg-gray-50 text-gray-800"
//             />
//           </div>

//           {/* Checkboxes */}
//           <div className="flex gap-6">
//             <label className="flex items-center gap-2 text-gray-800">
//               <input
//                 type="checkbox"
//                 checked={includeHashtags}
//                 onChange={() => setIncludeHashtags(!includeHashtags)}
//               />
//               Hashtags
//             </label>

//             <label className="flex items-center gap-2 text-gray-800">
//               <input
//                 type="checkbox"
//                 checked={includeEmoji}
//                 onChange={() => setIncludeEmoji(!includeEmoji)}
//               />
//               Emojis
//             </label>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 transition-all"
//           >
//             {loading ? "Generating..." : "Generate Post"}
//           </button>
//         </form>

//         {/* Results */}
//         {variations.length > 0 && (
//           <div className="mt-8 space-y-4">
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">
//               Generated Variations:
//             </h2>

//             {variations.map((v, i) => (
//               <div
//                 key={i}
//                 className="relative bg-gray-50 p-4 rounded-xl border hover:shadow-md transition"
//               >
//                 <button
//                   onClick={() => copyText(v)}
//                   className="absolute top-3 right-3 text-gray-500 hover:text-indigo-600"
//                   title="Copy to clipboard"
//                 >
//                   <Copy size={18} />
//                 </button>
//                 <p className="text-gray-900 whitespace-pre-line">{v}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

