export type Scene =
  | 'dark_room'
  | 'music_intro'
  | 'age_trap'
  | 'cake_ceremony'
  | 'cake_cut_cat'
  | 'gift_box'
  | 'poem_scrapbook'
  | 'achievements'
  | 'final_blessing';

export interface PoemCardData {
  id: number;
  title: string;
  lines: string[];
  photoCaption?: string;
  accent: string;
}

export const POEM_CARDS: PoemCardData[] = [
  {
    id: 1,
    title: 'A Decade of Becoming 🔭',
    lines: [
      'And so, another beautiful decade comes to an end,',
      'A journey of battles, lessons, and strength.',
      "You've faced so much and overcome it all,",
      "And I couldn't be prouder of how far you've come.",
    ],
    photoCaption: 'A journey of strength & grace',
    accent: '#f59e0b',
  },
  {
    id: 2,
    title: 'Four Years of Memories',
    lines: [
      "I've been a part of your life for just four years,",
      'Through countless highs, a few downs, and changing times.',
      "I don't know how much of a difference I've made,",
      'But witnessing your growth has been a gift in itself.',
    ],
    photoCaption: 'Every memory cherished',
    accent: '#ec4899',
  },
  {
    id: 3,
    title: 'A Little Too Much Care',
    lines: [
      'I know I sometimes care a little too much,',
      'And I hope my presence was never a little too much to handle.',
      'Your ability to forgive is what makes you rare,',
      'A beautiful soul with a heart beyond compare.',
    ],
    photoCaption: 'A heart beyond compare',
    accent: '#8b5cf6',
  },
  {
    id: 4,
    title: 'Dreams and Beyond',
    lines: [
      "You've achieved what you once dreamed of,",
      "And I know there's so much more waiting ahead.",
      'What makes me prouder is not just what you achieve,',
      'But your desire to discover all that you can be.',
    ],
    photoCaption: 'Chasing the horizon',
    accent: '#06b6d4',
  },
  {
    id: 5,
    title: 'Your Endless Potential',
    lines: [
      'Not everyone, even with so much in life,',
      'Still carries the hunger to keep moving forward.',
      'But hearing you say you want to test your own potential,',
      'Makes me admire you a little more every time.',
    ],
    photoCaption: 'Boundless hunger & fire',
    accent: '#10b981',
  },
  {
    id: 6,
    title: 'Forever Sixteen',
    lines: [
      'And no matter how much you grow,',
      'Or how far life takes you along the way,',
      "You'll always be that little, energetic sixteen-year-old",
      'In my eyes, even through your twenties and beyond.',
    ],
    photoCaption: 'That bright, energetic smile',
    accent: '#f43f5e',
  },
  {
    id: 7,
    title: 'The Final Message ❤️',
    lines: [
      'Happy Birthday.',
      "Here's to another decade of becoming. ❤️",
    ],
    photoCaption: 'To you, always.',
    accent: '#e11d48',
  },
];

export interface AchievementItem {
  stage: string;
  score: string;
  description: string;
  metricType: 'percentage' | 'cgpa';
  numericTarget: number;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    stage: 'Class 10th',
    score: '85%',
    description: 'An achievement worth celebrating.',
    metricType: 'percentage',
    numericTarget: 85,
  },
  {
    stage: 'Class 12th',
    score: '71%',
    description: 'Every chapter taught you something, and you kept moving forward.',
    metricType: 'percentage',
    numericTarget: 71,
  },
  {
    stage: 'College',
    score: '8.95 CGPA',
    description: 'An absolutely remarkable performance. Look at you go!',
    metricType: 'cgpa',
    numericTarget: 8.95,
  },
];
