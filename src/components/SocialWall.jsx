import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, ThumbsUp, MessageSquare, Share2, ExternalLink } from 'lucide-react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { API_URL, apiFetch } from '../config/api';

const SocialWall = () => {
    const [wallData, setWallData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSocialWall = async () => {
            try {
                const res = await apiFetch(`${API_URL}/social-wall`);
                const json = await res.json();
                if (json.success) {
                    setWallData(json.data);
                }
            } catch (error) {
                console.error("Failed to fetch social wall:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSocialWall();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const ig = wallData?.instagram || {
        imageUrl: "/hero_ac.webp",
        caption: "Experience the pinnacle of corporate cooling with our latest 1.5 Ton Inverter AC series. Designed for extreme summers. ❄️✨ #GREE INDIA #CoolingSolutions #SmartAC",
        likes: "1,248 likes",
        date: "2 DAYS AGO",
        postUrl: "https://www.instagram.com/gree_india_"
    };

    const fb = wallData?.facebook || {
        imageUrl: "/hero_ac.webp",
        caption: "Are you ready for the ultimate summer upgrade? ☀️\n\nOur new fixed-speed range is officially dropping this Friday. Get ready to experience uninterrupted cooling with 100% copper coils and advanced PM 2.5 filtration.\n\n#GreeSummer #Innovation #NewLaunch",
        likes: "2.4K",
        date: "4 hrs",
        postUrl: "https://www.facebook.com/GREEINDIAOFFICAL"
    };

    return (
        <div className="w-full max-w-7xl mx-auto py-4 md:py-6 px-4 md:px-8">
            <div className="text-center mb-12 md:mb-16">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xs font-black text-blue-700 uppercase tracking-[0.3em] block mb-4"
                >
                    Stay Connected
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight"
                >
                    Latest Updates from <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Our Socials</span>
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch">

                {/* Instagram Card */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 group relative flex flex-col"
                >
                    {/* Background Glow */}
                    <div className="absolute -inset-10 bg-gradient-to-tr from-pink-500/10 via-blue-600/10 to-yellow-500/10 blur-2xl z-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 bg-white m-1 rounded-[1.8rem] flex flex-col flex-1">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-blue-600 p-[2px]">
                                    <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden flex items-center justify-center">
                                        <img src="https://placehold.co/100x100/1e40af/white?text=Gree" alt="GREE INDIA" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1">
                                        gree_india_
                                        <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                                    </h4>
                                    <p className="text-[10px] text-gray-500">India</p>
                                </div>
                            </div>
                            <a href={ig.postUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                                <FaInstagram size={24} />
                            </a>
                        </div>

                        {/* Image */}
                        <div className="w-full aspect-square relative bg-gray-100 overflow-hidden">
                            <img src={ig.imageUrl} alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <a href={ig.postUrl} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                                    View on Instagram <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Actions & Text */}
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-4">
                                    <button className="text-gray-900 hover:text-pink-600 transition-colors"><Heart size={24} /></button>
                                    <button className="text-gray-900 hover:text-gray-600 transition-colors"><MessageCircle size={24} /></button>
                                    <button className="text-gray-900 hover:text-gray-600 transition-colors"><Send size={24} /></button>
                                </div>
                                <button className="text-gray-900 hover:text-gray-600 transition-colors"><Bookmark size={24} /></button>
                            </div>
                            <p className="text-sm font-bold text-gray-900 mb-2">{ig.likes}</p>
                            <p className="text-sm text-gray-800 line-clamp-3">
                                <span className="font-bold mr-2">gree_india_</span>
                                {ig.caption}
                            </p>
                            <div className="mt-auto pt-4">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{ig.date}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Facebook Card */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 group relative flex flex-col"
                >
                    {/* Background Glow */}
                    <div className="absolute -inset-10 bg-gradient-to-tr from-blue-500/10 via-blue-600/10 to-cyan-500/10 blur-2xl z-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 bg-white m-1 rounded-[1.8rem] flex flex-col flex-1">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full border-2 border-blue-50 overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                                    <img src="https://placehold.co/100x100/blue/white?text=Gree" alt="GREE INDIA Facebook" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-[15px] flex items-center gap-1.5">
                                        GREE INDIA
                                        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                                        <span>{fb.date}</span> • <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <a href={fb.postUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shrink-0">
                                <FaFacebookF size={20} />
                            </a>
                        </div>

                        {/* Text Content */}
                        <div className="px-6 pb-4">
                            <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap line-clamp-3">
                                {fb.caption}
                            </p>
                        </div>

                        {/* Image (1:1 Ratio) */}
                        <div className="w-full aspect-square relative bg-gray-100 overflow-hidden group/img">
                            <img src={fb.imageUrl} alt="Facebook Post" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <a href={fb.postUrl} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover/img:opacity-100 translate-y-4 group-hover/img:translate-y-0 transition-all duration-300 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                                    View on Facebook <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Stats & Actions */}
                        <div className="px-6 py-4 mt-auto">
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex -space-x-1 shrink-0">
                                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white"><ThumbsUp size={10} fill="currentColor" /></div>
                                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white"><Heart size={10} fill="currentColor" /></div>
                                    </div>
                                    <span>{fb.likes}</span>
                                </div>
                                <div className="flex gap-3">
                                    <span>342 comments</span>
                                    <span>89 shares</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center px-2">
                                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 sm:px-4 py-2 rounded-xl transition-colors font-semibold text-sm">
                                    <ThumbsUp size={20} /> Like
                                </button>
                                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 sm:px-4 py-2 rounded-xl transition-colors font-semibold text-sm">
                                    <MessageSquare size={20} /> Comment
                                </button>
                                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 sm:px-4 py-2 rounded-xl transition-colors font-semibold text-sm">
                                    <Share2 size={20} /> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default SocialWall; SocialWall;
