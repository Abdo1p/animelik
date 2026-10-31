import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, AlertOctagon, Send, User } from 'lucide-react';
import { UserComment } from '../types/anime';

interface CommentsSectionProps {
  targetId: string;
  targetTitle: string;
  user: { name: string; email: string } | null;
  onOpenAuth: () => void;
}

const INITIAL_COMMENTS: UserComment[] = [
  {
    id: 'c1',
    targetId: 'any',
    userName: 'سليمان الأوتاكو',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    content: 'الحلقة أسطورية بكل المقاييس والتحريك في هذا القتال فاق التوقعات! شكراً animelik على الرفع فائق السرعة!',
    createdAt: 'منذ ساعتين',
    likes: 18,
    isSpoiler: false,
  },
  {
    id: 'c2',
    targetId: 'any',
    userName: 'Reem_Anime',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'يا جماعة النهاية كانت صدمة غير متوقعة، خاصة ظهور الشخصية الغامضة في آخر دقيقة! حمااااس للأسبوع القادم!',
    createdAt: 'منذ 5 ساعات',
    likes: 12,
    isSpoiler: true,
  },
];

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  targetId,
  targetTitle,
  user,
  onOpenAuth,
}) => {
  const [comments, setComments] = useState<UserComment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [revealedSpoilers, setRevealedSpoilers] = useState<string[]>([]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) {
      onOpenAuth();
      return;
    }

    const created: UserComment = {
      id: `c-${Date.now()}`,
      targetId,
      userName: user.name,
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      content: newComment.trim(),
      createdAt: 'الآن',
      likes: 1,
      isSpoiler,
    };

    setComments([created, ...comments]);
    setNewComment('');
    setIsSpoiler(false);
  };

  const handleLike = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const toggleSpoilerReveal = (id: string) => {
    if (revealedSpoilers.includes(id)) {
      setRevealedSpoilers(revealedSpoilers.filter((i) => i !== id));
    } else {
      setRevealedSpoilers([...revealedSpoilers, id]);
    }
  };

  return (
    <div className="rounded-2xl bg-[#161822] border border-[#272a38] p-5 shadow-xl space-y-5 text-right">
      <div className="flex items-center justify-between border-b border-[#252835] pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#e50914]" />
          <h3 className="text-white font-bold text-base">التعليقات والمناقشات</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#1e222e] text-gray-400 font-mono">
            {comments.length}
          </span>
        </div>

        <p className="text-xs text-gray-500 hidden sm:block">شاركونا آراءكم وانطباعاتكم بدون حرق</p>
      </div>

      {/* New Comment Input */}
      <form onSubmit={handleAddComment} className="space-y-3">
        <textarea
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={user ? 'اكتب تعليقك أو رأيك هنا...' : 'سجل الدخول للمشاركة في النقاش...'}
          className="w-full bg-[#12131a] border border-[#282d3d] rounded-xl p-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914] resize-none"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-amber-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isSpoiler}
              onChange={(e) => setIsSpoiler(e.target.checked)}
              className="rounded accent-[#e50914] w-3.5 h-3.5"
            />
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>تعليقي يحتوي على حرق للأحداث</span>
          </label>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#e50914] hover:bg-[#c2050f] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#e50914]/25 transition-all"
          >
            <Send className="w-3.5 h-3.5 mr-0.5" />
            <span>نشر التعليق</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3 pt-3 border-t border-[#232635]">
        {comments.map((comment) => {
          const isRevealed = revealedSpoilers.includes(comment.id);

          return (
            <div
              key={comment.id}
              className="p-3.5 rounded-xl bg-[#1b1e2a] border border-[#242837] space-y-2 text-right"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={comment.userAvatar}
                    alt={comment.userName}
                    className="w-8 h-8 rounded-full object-cover border border-[#313647]"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-white">{comment.userName}</h5>
                    <span className="text-[10px] text-gray-500">{comment.createdAt}</span>
                  </div>
                </div>

                {comment.isSpoiler && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold">
                    حرق أحداث
                  </span>
                )}
              </div>

              {/* Comment Content */}
              {comment.isSpoiler && !isRevealed ? (
                <div className="p-3 rounded-lg bg-black/40 border border-dashed border-amber-500/30 text-center">
                  <p className="text-xs text-amber-300 font-medium mb-1.5">
                    هذا التعليق قد يحتوي على حرق للأحداث
                  </p>
                  <button
                    onClick={() => toggleSpoilerReveal(comment.id)}
                    className="text-xs text-white bg-amber-600/60 hover:bg-amber-600 px-3 py-1 rounded-md font-bold transition-colors"
                  >
                    إظهار التعليق
                  </button>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {comment.content}
                </p>
              )}

              {/* Likes */}
              <div className="flex items-center justify-end gap-2 pt-1 text-xs text-gray-400">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1 hover:text-[#e50914] transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
