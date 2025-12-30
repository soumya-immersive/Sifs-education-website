"use client";

import { motion, Variants } from "framer-motion";
import { Share2, Link as LinkIcon } from "lucide-react";
import { BlogPost } from "../../data/posts";

interface Props {
  post: BlogPost;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function BlogContent({ post }: Props) {
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-10"
    >
      {/* Title Header */}
      <motion.h1 variants={fadeUp} className="text-3xl font-bold text-gray-900 leading-tight">
        {post.title}
      </motion.h1>

      {/* Meta Bar */}
      <motion.div variants={fadeUp} className="flex items-center justify-between border-t border-b border-gray-100 py-4">
        <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
          <span>By {post.author}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{post.date}</span>
        </div>
        <div className="flex gap-4">
          <button className="hover:text-blue-600 transition-colors"><Share2 size={18} /></button>
          <button className="hover:text-blue-600 transition-colors"><LinkIcon size={18} /></button>
        </div>
      </motion.div>

      {/* Intro Text */}
      <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed">
        {post.introduction}
      </motion.p>

      {/* Practice-Focused Section */}
      <motion.div variants={fadeUp} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Practice-Focused Training Methodology</h2>
        <p className="text-gray-600 text-sm">This training program emphasizes applied learning supported by strong conceptual clarity. You are trained in:</p>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-3 text-sm text-gray-600">
          <ul className="space-y-3">
            <li>• Core principles of document authenticity</li>
            <li>• Identification of genuine, altered, and forged documents</li>
          </ul>
          <ul className="space-y-3">
            <li>• Detection of erasures, overwriting, and additions</li>
            <li>• Ethical responsibilities and professional limitations</li>
          </ul>
        </div>
      </motion.div>

      {/* Extensive Hands-On Section */}
      <motion.div variants={fadeUp} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Extensive Hands-On Practical Exposure</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-3 text-sm text-gray-600">
          <ul className="space-y-3">
            <li>• Examination of real and simulated documents</li>
            <li>• Side-by-side comparison of disputed samples</li>
          </ul>
          <ul className="space-y-3">
            <li>• Supervised practical sessions with expert feedback</li>
            <li>• Practice in documenting observations</li>
          </ul>
        </div>
      </motion.div>

      {/* Secondary Content Image */}
      <motion.div variants={fadeUp} className="relative rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl">
        <img 
          src={post.contentImage} 
          alt="Practical Training" 
          className="w-full h-auto object-cover"
        />
      </motion.div>

      {/* Footer Socials */}
      <motion.div variants={fadeUp} className="flex gap-4 pt-6">
        {[
          { name: 'facebook', icon: '/blog/facebook.png' },
          { name: 'instagram', icon: '/blog/insta.png' },
          { name: 'linkedin', icon: '/blog/linkedin.png' },
          { name: 'twitter', icon: '/blog/twitter.png' } 
        ].map((social) => (
          <a 
            key={social.name}
            href="#" 
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <img 
              src={social.icon} 
              alt={social.name} 
              width={42} 
              height={42}
              className="opacity-70"
            />
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}