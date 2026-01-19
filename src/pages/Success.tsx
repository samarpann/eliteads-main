import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Video, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Success = () => {
    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Header />
            <AnimatedBackground />

            <main className="container mx-auto px-4 pt-40 pb-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 relative"
                    >
                        <CheckCircle className="w-12 h-12 text-primary" />
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-primary/20"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6 font-orbitron"
                    >
                        <span className="text-primary">THANK YOU</span> FOR <br />
                        REACHING OUT!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
                    >
                        Your inquiry has been successfully received. Our team will review your details
                        and get back to you within 24 hours to discuss your growth strategy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-1 overflow-hidden rounded-3xl mb-12 shadow-2xl relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-30 animate-pulse-slow" />

                        <div className="relative aspect-video rounded-[22px] overflow-hidden bg-black/40 flex flex-col items-center justify-center border border-white/10">
                            {/* This is where the founder's video would go */}
                            <div className="text-center group-hover:scale-105 transition-transform duration-500">
                                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-primary/90 transition-colors">
                                    <Video className="w-8 h-8 text-black" fill="currentColor" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                    A Personal message from Aditya & Vishnu
                                </h3>
                                <p className="text-muted-foreground text-sm uppercase tracking-widest font-orbitron">
                                    Playing Welcome Video...
                                </p>
                            </div>

                            {/* Video Overlay Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-left">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-4">
                                        <img
                                            src="/src/assets/aditya-walia.webp"
                                            className="w-12 h-12 rounded-full border-2 border-primary"
                                            alt="Aditya Walia"
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' }}
                                        />
                                        <img
                                            src="/src/assets/vishnu-goyal.jpg"
                                            className="w-12 h-12 rounded-full border-2 border-secondary"
                                            alt="Vishnu Goyal"
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white leading-none mb-1">Elite Ad Founders</p>
                                        <p className="text-xs text-primary font-orbitron">Precision Growth Team</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Success;
