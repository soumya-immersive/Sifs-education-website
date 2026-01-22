"use client";

import { motion, Variants } from "framer-motion";
import { Share2, Link as LinkIcon } from "lucide-react";
import { BlogPost } from "@/types/blog";

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
          <span>By {post.author || "SIFS India"}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{new Date(post.publish_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}</span>
        </div>
        <div className="flex gap-4">
          <button className="hover:text-blue-600 transition-colors"><Share2 size={18} /></button>
          <button className="hover:text-blue-600 transition-colors"><LinkIcon size={18} /></button>
        </div>
      </motion.div>

      {/* Dynamic Content */}
      <motion.div
        variants={fadeUp}
        className="prose prose-lg text-gray-600 leading-relaxed max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

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