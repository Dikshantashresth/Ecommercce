import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
  id: string;
  productId: string;
  username: string;
  rating: number;
  comment: string;
  date: string; // ISO string
}

// Mock reviews seeded per product
const mockReviews: Review[] = [
  { id: 'r1', productId: '1', username: 'alexM', rating: 5, comment: 'The Aura Coffee Machine changed my mornings completely. The AI learns exactly how I like my brew after just a few days.', date: '2026-03-12T08:30:00Z' },
  { id: 'r2', productId: '1', username: 'priya_k', rating: 4, comment: 'Beautiful design and great coffee. Wish the water tank was a bit larger though.', date: '2026-03-18T14:20:00Z' },
  { id: 'r3', productId: '1', username: 'coffeeNerd', rating: 5, comment: 'Best smart coffee machine I have ever used. The app integration is seamless.', date: '2026-03-25T09:45:00Z' },
  { id: 'r4', productId: '2', username: 'greenThumb', rating: 5, comment: 'My herbs have never been healthier! The automated watering is a game changer.', date: '2026-03-10T11:00:00Z' },
  { id: 'r5', productId: '2', username: 'farmTech', rating: 4, comment: 'Great product. Setup took a while but worth it once running.', date: '2026-03-20T16:30:00Z' },
  { id: 'r6', productId: '3', username: 'smarthome_pro', rating: 5, comment: 'Controls every device in my house flawlessly. The voice commands are snappy.', date: '2026-02-28T10:15:00Z' },
  { id: 'r7', productId: '3', username: 'techDave', rating: 4, comment: 'Solid hub. Integrates well with Zigbee and Z-Wave devices.', date: '2026-03-05T13:40:00Z' },
  { id: 'r8', productId: '4', username: 'aquarist99', rating: 5, comment: 'Finally a smart irrigation system that actually works. My lawn looks incredible.', date: '2026-03-15T07:20:00Z' },
  { id: 'r9', productId: '5', username: 'solar_sarah', rating: 4, comment: 'Efficient panels with great monitoring app. Installation was straightforward.', date: '2026-03-08T15:10:00Z' },
  { id: 'r10', productId: '6', username: 'cleanFreak', rating: 5, comment: 'This vacuum maps my apartment perfectly. Haven\'t touched a broom in months.', date: '2026-03-22T12:00:00Z' },
  { id: 'r11', productId: '7', username: 'petParent', rating: 5, comment: 'My cat loves the scheduled feeding. The portion control is very accurate.', date: '2026-03-19T09:30:00Z' },
  { id: 'r12', productId: '8', username: 'comfortKing', rating: 4, comment: 'Keeps my house at the perfect temperature. The energy savings are noticeable.', date: '2026-03-14T18:45:00Z' },
];

interface ReviewState {
  userReviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getReviewsForProduct: (productId: string) => Review[];
  getAverageRating: (productId: string) => { avg: number; count: number };
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      userReviews: [],

      addReview: (review) => {
        const newReview: Review = {
          ...review,
          id: `user-${Date.now()}`,
          date: new Date().toISOString(),
        };
        set((state) => ({ userReviews: [newReview, ...state.userReviews] }));
      },

      getReviewsForProduct: (productId) => {
        const userRevs = get().userReviews.filter((r) => r.productId === productId);
        const mockRevs = mockReviews.filter((r) => r.productId === productId);
        // User reviews first, then mock, sorted by date desc
        return [...userRevs, ...mockRevs].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      },

      getAverageRating: (productId) => {
        const all = get().getReviewsForProduct(productId);
        if (all.length === 0) return { avg: 0, count: 0 };
        const sum = all.reduce((acc, r) => acc + r.rating, 0);
        return { avg: Math.round((sum / all.length) * 10) / 10, count: all.length };
      },
    }),
    { name: 'inovate-reviews' }
  )
);
