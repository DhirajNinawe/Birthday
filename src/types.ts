export type ShinamScene =
  | 'dark_room'
  | 'music_moment'
  | 'age_prank'
  | 'cake_candle'
  | 'grand_wishing'
  | 'cake_cat'
  | 'shinam_run'
  | 'reward_sketch'
  | 'gift_open'
  | 'poem_memories'
  | 'achievements'
  | 'final_blessing';

export interface PoemCardData {
  id: number;
  title: string;
  lines: string[];
  photoCaption: string;
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
    photoCaption: 'A journey of battles, lessons & strength',
    accent: '#D6B47A',
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
    photoCaption: 'Witnessing your growth is a gift',
    accent: '#D98C9A',
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
    accent: '#F2C5AD',
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
    photoCaption: 'Discovering all that you can be',
    accent: '#D6B47A',
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
    photoCaption: 'Admiring your fire every single time',
    accent: '#D98C9A',
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
    photoCaption: 'Always that energetic sixteen-year-old',
    accent: '#F2C5AD',
  },
  {
    id: 7,
    title: 'The Final Message ❤️',
    lines: [
      'Happy Birthday.',
      "Here's to another decade of becoming. ❤️",
    ],
    photoCaption: 'Happy Birthday, Shinam.',
    accent: '#D6B47A',
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
    stage: 'CLASS 10TH',
    score: '85%',
    description: 'One milestone conquered.',
    metricType: 'percentage',
    numericTarget: 85,
  },
  {
    stage: 'CLASS 12TH',
    score: '71%',
    description: 'Another chapter completed.',
    metricType: 'percentage',
    numericTarget: 71,
  },
  {
    stage: 'COLLEGE',
    score: '8.95 CGPA',
    description: "A remarkable performance. And we're just getting started.",
    metricType: 'cgpa',
    numericTarget: 8.95,
  },
];
