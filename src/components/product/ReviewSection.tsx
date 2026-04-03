'use client';

import { useState } from 'react';
import { useReviewStore } from '@/store/useReviewStore';
import { useAuthStore } from '@/store/useAuthStore';
import { showToast } from '@/components/ui/Toast';
import { Star, MessageSquare, User as UserIcon } from 'lucide-react';

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function StarRating({
  value,
  onChange,
  interactive = false,
  size = 'sm',
}: {
  value: number;
  onChange?: (v: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md';
}) {
  const [hover, setHover] = useState(0);
  const cls = size === 'md' ? 'h-6 w-6' : 'h-4 w-4';

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(i)}
          onMouseEnter={() => interactive && setHover(i)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className={`${cls} transition-colors ${
              i <= (hover || value)
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300 dark:text-zinc-700'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function RatingBreakdown({ productId }: { productId: string }) {

  const allReviews = useReviewStore((s) => s.getReviewsForProduct(productId));
  const reviews = allReviews.filter((r) => r.productId === productId);
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const total = reviews.length || 1;

  return (
    <div className="space-y-1.5">
      {counts.map(({ star, count }) => (
        <div key={star} className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-zinc-400 w-4 text-right">{star}</span>
          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
          <div className="flex-1 h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all"
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
          <span className="text-gray-400 dark:text-zinc-500 text-xs w-6 text-right">{count}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReviewSection({ productId }: { productId: string }) {
  const reviews = useReviewStore((s) => s.getReviewsForProduct(productId));
  const { avg, count } = useReviewStore((s) => s.getAverageRating(productId));
  const addReview = useReviewStore((s) => s.addReview);
  const user = useAuthStore((s) => s.user);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in to leave a review', 'warning');
      return;
    }
    if (!comment.trim()) {
      showToast('Please write a comment', 'warning');
      return;
    }
    addReview({ productId, username: user.username, rating, comment: comment.trim() });
    showToast('Review submitted!', 'success');
    setComment('');
    setRating(5);
    setShowForm(false);
  };

  return (
    <section className="mt-16 pt-12 border-t border-gray-200 dark:border-zinc-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-3">
            <StarRating value={Math.round(avg)} />
            <span className="text-sm text-gray-500 dark:text-zinc-400">
              {avg} out of 5 · {count} review{count !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            if (!user) {
              showToast('Please sign in to leave a review', 'warning');
              return;
            }
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm"
        >
          <MessageSquare className="h-4 w-4" />
          Write a Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating breakdown */}
        <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-gray-200 dark:border-white/5 p-6">
          <div className="text-center mb-4">
            <span className="text-5xl font-extrabold text-gray-900 dark:text-white">{avg}</span>
            <div className="flex justify-center mt-2">
              <StarRating value={Math.round(avg)} />
            </div>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
              {count} review{count !== 1 ? 's' : ''}
            </p>
          </div>
          <RatingBreakdown productId={productId} />
        </div>

        {/* Reviews list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Write review form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-6 mb-2"
            >
              <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-200 mb-3">
                Your Review
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-500 dark:text-zinc-400">Rating:</span>
                <StarRating value={rating} onChange={setRating} interactive size="md" />
                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                  {rating}/5
                </span>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Share your experience with this product..."
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm resize-none transition-colors"
              />
              <div className="flex gap-3 mt-3">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2 px-5 rounded-xl transition-colors text-sm"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200 font-medium py-2 px-4 text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Review cards */}
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-zinc-900/30 rounded-2xl border border-gray-200 dark:border-white/5">
              <MessageSquare className="h-10 w-10 text-gray-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-zinc-500">No reviews yet. Be the first!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-white/5 rounded-2xl p-5 transition-transform duration-200 will-change-transform hover:scale-[1.005]"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {review.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                        {review.username}
                        {review.id.startsWith('user-') && (
                          <span className="text-[10px] bg-teal-500/10 text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded-full font-medium">You</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-zinc-500">
                        {timeAgo(review.date)}
                      </p>
                    </div>
                  </div>
                  <StarRating value={review.rating} />
                </div>
                <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
