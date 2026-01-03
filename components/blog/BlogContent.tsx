"use client";

import { motion, Variants } from "framer-motion";
import { Share2, Link as LinkIcon, Calendar, User, Facebook, Instagram, Linkedin, Twitter, ExternalLink, X } from "lucide-react";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import { toast } from "react-hot-toast";

interface Props {
  post: {
    id: number;
    title: string;
    author: string;
    date: string;
    introduction: string;
    content: string;
    contentImage: string;
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  editMode?: boolean;
  onUpdate?: (fields: any) => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function BlogContent({ post, editMode = false, onUpdate }: Props) {
  const stripHtml = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, "");

  const handleShare = async () => {
    const shareData = {
      title: stripHtml(post.title),
      text: stripHtml(post.introduction),
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Open Facebook share
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const updateSocialLink = (platform: string, value: string) => {
    onUpdate?.({
      socialLinks: {
        ...(post.socialLinks || {}),
        [platform]: value
      }
    });
  };

  const socialPlatforms = [
    { name: 'facebook', icon: '/blog/facebook.png', placeholder: 'https://facebook.com/...' },
    { name: 'instagram', icon: '/blog/insta.png', placeholder: 'https://instagram.com/...' },
    { name: 'linkedin', icon: '/blog/linkedin.png', placeholder: 'https://linkedin.com/...' },
    { name: 'twitter', icon: '/blog/twitter.png', placeholder: 'https://twitter.com/...' }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-10"
    >
      {/* Title Header */}
      <motion.h1 variants={fadeUp} className="text-3xl font-bold text-gray-900 leading-tight">
        <EditableText
          html={post.title}
          editMode={editMode}
          onChange={(val) => onUpdate?.({ title: val })}
        />
      </motion.h1>

      {/* Meta Bar */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-b border-gray-100 py-4 gap-4 sm:gap-0">
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">
          <div className="flex items-center gap-1">
            <User size={14} className="text-blue-500" />
            <EditableText
              html={post.author}
              editMode={editMode}
              onChange={(val) => onUpdate?.({ author: val })}
            />
          </div>
          <span className="hidden sm:inline w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-blue-500" />
            <EditableText
              html={post.date}
              editMode={editMode}
              onChange={(val) => onUpdate?.({ date: val })}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleShare}
            className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-sm font-semibold"
            title="Share Post"
          >
            <Share2 size={18} />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-sm font-semibold"
            title="Copy Link"
          >
            <LinkIcon size={18} />
            <span className="hidden sm:inline">Copy Link</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div variants={fadeUp} className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-li:text-gray-600">
        <EditableText
          html={post.content}
          editMode={editMode}
          onChange={(val) => onUpdate?.({ content: val })}
        />
      </motion.div>

      {/* Secondary Content Image */}
      <motion.div variants={fadeUp} className="relative rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl aspect-video">
        <EditableImage
          src={post.contentImage}
          alt="Practical Training"
          editMode={editMode}
          onChange={(src) => onUpdate?.({ contentImage: src })}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Footer Socials */}
      <motion.div variants={fadeUp} className="space-y-6 pt-6">
        <div className="flex flex-wrap gap-4">
          {socialPlatforms.map((social) => {
            const link = post.socialLinks?.[social.name as keyof typeof post.socialLinks] || "#";
            return (
              <div key={social.name} className="flex flex-col gap-2">
                <a
                  href={editMode ? undefined : link}
                  target={editMode ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer ${editMode ? 'cursor-default' : ''}`}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="opacity-70 group-hover:opacity-100"
                  />
                </a>
                {editMode && (
                  <input
                    type="text"
                    value={post.socialLinks?.[social.name as keyof typeof post.socialLinks] || ""}
                    onChange={(e) => updateSocialLink(social.name, e.target.value)}
                    placeholder={social.placeholder}
                    className="text-[10px] w-32 border border-gray-200 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500"
                  />
                )}
              </div>
            );
          })}
        </div>
        {editMode && (
          <p className="text-xs text-gray-400 italic">
            Enter the full URLs for your social media profiles above.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
