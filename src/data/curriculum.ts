import { Day, BonusCourse } from '../types';

function searchUrl(title: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' NeetCode')}`;
}

export const curriculum: Day[] = [
  // ─── DAY 1 ─── Easy
  {
    day: 1, type: 'content', difficulty: 'easy', videoCount: 5,
    tasks: [
      { id: 'd1t1', title: 'Majority Element', leetcode: 169, difficulty: 'easy', duration: 6, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=UoTI6zBIBMo' },
      { id: 'd1t2', title: 'Top 10 Coding Interview Rules', leetcode: null, difficulty: 'easy', duration: 7, topic: 'General', youtubeUrl: 'https://www.youtube.com/watch?v=PKXD2M2kaXQ' },
      { id: 'd1t3', title: 'Path Sum', leetcode: 112, difficulty: 'easy', duration: 7, topic: 'Trees', youtubeUrl: 'https://www.youtube.com/watch?v=Ad_TDBqe4Y4' },
      { id: 'd1t4', title: 'Symmetric Tree', leetcode: 101, difficulty: 'easy', duration: 8, topic: 'Trees', youtubeUrl: 'https://www.youtube.com/watch?v=NeSeH2ECZUw' },
      { id: 'd1t5', title: 'Happy Number', leetcode: 202, difficulty: 'easy', duration: 8, topic: 'Hashing', youtubeUrl: 'https://www.youtube.com/watch?v=d5SvCvRmmww' },
    ],
  },
  // ─── DAY 2 ─── Easy
  {
    day: 2, type: 'content', difficulty: 'easy', videoCount: 5,
    tasks: [
      { id: 'd2t1', title: 'Implement Stack Using Queues', leetcode: 225, difficulty: 'easy', duration: 8, topic: 'Queue', youtubeUrl: 'https://www.youtube.com/watch?v=HC6nEzSqq5o' },
      { id: 'd2t2', title: 'Longest Common Prefix', leetcode: 14, difficulty: 'easy', duration: 8, topic: 'Strings', youtubeUrl: 'https://www.youtube.com/watch?v=PWoIZxcamsQ' },
      { id: 'd2t3', title: 'Fizz Buzz', leetcode: 412, difficulty: 'easy', duration: 8, topic: 'General', youtubeUrl: 'https://www.youtube.com/watch?v=E3eO7jTFElU' },
      { id: 'd2t4', title: 'Diameter of Binary Tree', leetcode: 543, difficulty: 'easy', duration: 8, topic: 'Trees', youtubeUrl: 'https://www.youtube.com/watch?v=DpyCkHMlxLc' },
      { id: 'd2t5', title: 'Balanced Binary Tree', leetcode: 110, difficulty: 'easy', duration: 8, topic: 'Trees', youtubeUrl: 'https://www.youtube.com/watch?v=gu5rAEvm9Fk' },
    ],
  },
  // ─── DAY 3 ─── Easy
  {
    day: 3, type: 'content', difficulty: 'easy', videoCount: 5,
    tasks: [
      { id: 'd3t1', title: 'Binary Search Explained', leetcode: null, difficulty: 'easy', duration: 9, topic: 'Binary Search', youtubeUrl: 'https://www.youtube.com/watch?v=t3yPHFyKxr4' },
      { id: 'd3t2', title: 'Search a 2D Matrix', leetcode: 74, difficulty: 'easy', duration: 9, topic: 'Binary Search', youtubeUrl: 'https://www.youtube.com/watch?v=dP4cb8zbohY' },
      { id: 'd3t3', title: 'Implement Queue Using Stacks', leetcode: 232, difficulty: 'easy', duration: 9, topic: 'Queue', youtubeUrl: 'https://www.youtube.com/watch?v=Qb4CjVNgvUQ' },
      { id: 'd3t4', title: 'Merge Sorted Array', leetcode: 88, difficulty: 'easy', duration: 9, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=05mXJB5SLA8' },
      { id: 'd3t5', title: 'Add Two Numbers', leetcode: 2, difficulty: 'easy', duration: 9, topic: 'Linked List', youtubeUrl: 'https://www.youtube.com/watch?v=MYtp__JpTns' },
    ],
  },
  // ─── DAY 4 ─── Easy
  {
    day: 4, type: 'content', difficulty: 'easy', videoCount: 5,
    tasks: [
      { id: 'd4t1', title: 'Climbing Stairs', leetcode: 70, difficulty: 'easy', duration: 10, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=5mWBnYrdO70' },
      { id: 'd4t2', title: 'Min Cost Climbing Stairs', leetcode: 746, difficulty: 'easy', duration: 10, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=A3LYMRqAQeU' },
      { id: 'd4t3', title: 'Two Sum', leetcode: 1, difficulty: 'easy', duration: 10, topic: 'Hashing', youtubeUrl: 'https://www.youtube.com/watch?v=BQ2IJ-fouJ4' },
      { id: 'd4t4', title: 'Roman To Integer', leetcode: 13, difficulty: 'easy', duration: 10, topic: 'Strings', youtubeUrl: 'https://www.youtube.com/watch?v=qmkr61ySQwQ' },
      { id: 'd4t5', title: 'Last Stone Weight', leetcode: 1046, difficulty: 'easy', duration: 10, topic: 'Heap', youtubeUrl: 'https://www.youtube.com/watch?v=xq4RoS0vVfM' },
    ],
  },
  // ─── DAY 5 ─── Easy
  {
    day: 5, type: 'content', difficulty: 'easy', videoCount: 5,
    tasks: [
      { id: 'd5t1', title: 'Moving Average From Data Stream', leetcode: 346, difficulty: 'easy', duration: 11, topic: 'Queue', youtubeUrl: 'https://www.youtube.com/watch?v=WTuA4qNZky4' },
      { id: 'd5t2', title: 'Subsets', leetcode: 78, difficulty: 'easy', duration: 12, topic: 'Backtracking', youtubeUrl: 'https://www.youtube.com/watch?v=OQKWzRJYtwg' },
      { id: 'd5t3', title: 'Kth Largest Element in a Stream', leetcode: 703, difficulty: 'easy', duration: 12, topic: 'Heap', youtubeUrl: 'https://www.youtube.com/watch?v=i7Mt70QERw4' },
      { id: 'd5t4', title: 'Contains Duplicate II', leetcode: 219, difficulty: 'easy', duration: 12, topic: 'Hashing', youtubeUrl: 'https://www.youtube.com/watch?v=Te_MCY4uG-M' },
      { id: 'd5t5', title: "Pascal's Triangle", leetcode: 118, difficulty: 'easy', duration: 13, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=16GOlmWNDWE' },
    ],
  },
  // ─── DAY 6 ─── Mixed (Easy→Medium transition)
  {
    day: 6, type: 'content', difficulty: 'medium', videoCount: 5,
    tasks: [
      { id: 'd6t1', title: 'Palindrome Linked List', leetcode: 234, difficulty: 'easy', duration: 16, topic: 'Linked List', youtubeUrl: 'https://www.youtube.com/watch?v=uGGAJxeXa4U' },
      { id: 'd6t2', title: 'Remove Interval', leetcode: 1272, difficulty: 'medium', duration: 7, topic: 'Intervals', youtubeUrl: 'https://www.youtube.com/watch?v=YrB_zKEHgmQ' },
      { id: 'd6t3', title: 'Kth Largest Element in an Array', leetcode: 215, difficulty: 'medium', duration: 8, topic: 'Heap', youtubeUrl: 'https://www.youtube.com/watch?v=kmUL7CAOSwc' },
      { id: 'd6t4', title: 'Min Stack', leetcode: 155, difficulty: 'medium', duration: 9, topic: 'Design', youtubeUrl: 'https://www.youtube.com/watch?v=To2iap-ac3g' },
      { id: 'd6t5', title: 'K Closest Points to Origin', leetcode: 973, difficulty: 'medium', duration: 9, topic: 'Heap', youtubeUrl: 'https://www.youtube.com/watch?v=RLyF_-4Izg0' },
    ],
  },
  // ─── DAY 7 ─── Practice
  {
    day: 7, type: 'practice',
    suggestion: 'Re-solve any 3 problems from the last 6 days without looking at the video.',
  },
  // ─── DAY 8 ─── Medium
  {
    day: 8, type: 'content', difficulty: 'medium', videoCount: 5,
    tasks: [
      { id: 'd8t1', title: 'Binary Tree Right Side View', leetcode: 199, difficulty: 'medium', duration: 9, topic: 'Trees', youtubeUrl: 'https://www.youtube.com/watch?v=4lMY-g0Afg8' },
      { id: 'd8t2', title: 'Find Leaves of Binary Tree', leetcode: 366, difficulty: 'medium', duration: 9, topic: 'Trees', youtubeUrl: 'https://www.youtube.com/watch?v=VZCWLZ5PvKM' },
      { id: 'd8t3', title: 'Sort List', leetcode: 148, difficulty: 'medium', duration: 10, topic: 'Linked List', youtubeUrl: 'https://www.youtube.com/watch?v=7halZ77R55o' },
      { id: 'd8t4', title: 'Minimum Remove to Make Valid Parentheses', leetcode: 1249, difficulty: 'medium', duration: 10, topic: 'Strings', youtubeUrl: 'https://www.youtube.com/watch?v=thL70BR3yMA' },
      { id: 'd8t5', title: 'Count Good Nodes in Binary Tree', leetcode: 1448, difficulty: 'medium', duration: 10, topic: 'Trees', youtubeUrl: 'https://www.youtube.com/watch?v=AiCPoU8q2sU' },
    ],
  },
  // ─── DAY 9 ─── Medium
  {
    day: 9, type: 'content', difficulty: 'medium', videoCount: 5,
    tasks: [
      { id: 'd9t1', title: 'Subsets II', leetcode: 90, difficulty: 'medium', duration: 11, topic: 'Backtracking', youtubeUrl: 'https://www.youtube.com/watch?v=GPigeECXWZE' },
      { id: 'd9t2', title: 'Letter Combinations of a Phone Number', leetcode: 17, difficulty: 'medium', duration: 11, topic: 'Backtracking', youtubeUrl: 'https://www.youtube.com/watch?v=0snEunUacEo' },
      { id: 'd9t3', title: 'Max Area of Island', leetcode: 695, difficulty: 'medium', duration: 11, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=Dy-M-Suk8nk' },
      { id: 'd9t4', title: 'Surrounded Regions', leetcode: 130, difficulty: 'medium', duration: 12, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=yaBaE4fo6wA' },
      { id: 'd9t5', title: 'Flatten Binary Tree to Linked List', leetcode: 114, difficulty: 'medium', duration: 12, topic: 'Trees', youtubeUrl: 'https://www.youtube.com/watch?v=3IrFrQ2JSfg' },
    ],
  },
  // ─── DAY 10 ─── Medium
  {
    day: 10, type: 'content', difficulty: 'medium', videoCount: 5,
    tasks: [
      { id: 'd10t1', title: 'Permutation in String', leetcode: 567, difficulty: 'medium', duration: 13, topic: 'Strings', youtubeUrl: 'https://www.youtube.com/watch?v=mIorIJvhl8E' },
      { id: 'd10t2', title: 'Largest Number', leetcode: 179, difficulty: 'medium', duration: 13, topic: 'Sorting', youtubeUrl: 'https://www.youtube.com/watch?v=q6tyGuVVbfE' },
      { id: 'd10t3', title: 'Sort Colors', leetcode: 75, difficulty: 'medium', duration: 13, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=HO-qzdL_x8U' },
      { id: 'd10t4', title: 'Combination Sum II', leetcode: 40, difficulty: 'medium', duration: 13, topic: 'Backtracking', youtubeUrl: 'https://www.youtube.com/watch?v=I6f8Za0vRxE' },
      { id: 'd10t5', title: 'Design Circular Queue', leetcode: 622, difficulty: 'medium', duration: 13, topic: 'Design', youtubeUrl: 'https://www.youtube.com/watch?v=-MsZSmFGS4E' },
    ],
  },
  // ─── DAY 11 ─── Medium
  {
    day: 11, type: 'content', difficulty: 'medium', videoCount: 5,
    tasks: [
      { id: 'd11t1', title: 'Coin Change II', leetcode: 518, difficulty: 'medium', duration: 13, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=khIBdTrRggk' },
      { id: 'd11t2', title: 'Find the Duplicate Number', leetcode: 287, difficulty: 'medium', duration: 13, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=Lu3if4xOA1s' },
      { id: 'd11t3', title: 'Daily Temperatures', leetcode: 739, difficulty: 'medium', duration: 14, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=jmuo4BBfl3I' },
      { id: 'd11t4', title: 'Walls and Gates', leetcode: 286, difficulty: 'medium', duration: 14, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=wYv60DTtsto' },
      { id: 'd11t5', title: 'Dota2 Senate', leetcode: 649, difficulty: 'medium', duration: 14, topic: 'Queue', youtubeUrl: 'https://www.youtube.com/watch?v=oVuzg2AJYos' },
    ],
  },
  // ─── DAY 12 ─── Medium
  {
    day: 12, type: 'content', difficulty: 'medium', videoCount: 5,
    tasks: [
      { id: 'd12t1', title: 'Rotting Oranges', leetcode: 994, difficulty: 'medium', duration: 14, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=1BlwbFfgk-E' },
      { id: 'd12t2', title: 'Jump Game II', leetcode: 45, difficulty: 'medium', duration: 15, topic: 'Greedy', youtubeUrl: 'https://www.youtube.com/watch?v=d_1GRnMg_zs' },
      { id: 'd12t3', title: 'Permutations', leetcode: 46, difficulty: 'medium', duration: 15, topic: 'Backtracking', youtubeUrl: 'https://www.youtube.com/watch?v=_tgwDDWuU-Q' },
      { id: 'd12t4', title: 'Partition Equal Subset Sum', leetcode: 416, difficulty: 'medium', duration: 15, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=X50Rknzenus' },
      { id: 'd12t5', title: 'Hand of Straights', leetcode: 846, difficulty: 'medium', duration: 15, topic: 'Greedy', youtubeUrl: 'https://www.youtube.com/watch?v=ISHUyNJVq_M' },
    ],
  },
  // ─── DAY 13 ─── Medium
  {
    day: 13, type: 'content', difficulty: 'medium', videoCount: 5,
    tasks: [
      { id: 'd13t1', title: 'Generate Parentheses', leetcode: 22, difficulty: 'medium', duration: 16, topic: 'Backtracking', youtubeUrl: 'https://www.youtube.com/watch?v=VzMyeCMLdPI' },
      { id: 'd13t2', title: 'Next Permutation', leetcode: 31, difficulty: 'medium', duration: 17, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=oc3OOtGmH6U' },
      { id: 'd13t3', title: 'Find The Celebrity', leetcode: 277, difficulty: 'medium', duration: 17, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=lqdgGNGPS68' },
      { id: 'd13t4', title: 'Copy List With Random Pointer', leetcode: 138, difficulty: 'medium', duration: 17, topic: 'Linked List', youtubeUrl: 'https://www.youtube.com/watch?v=vy7ZJ4TdyS8' },
      { id: 'd13t5', title: 'Insert Delete GetRandom O(1)', leetcode: 380, difficulty: 'medium', duration: 17, topic: 'Design', youtubeUrl: 'https://www.youtube.com/watch?v=cRPoqZOlDkg' },
    ],
  },
  // ─── DAY 14 ─── Practice
  {
    day: 14, type: 'practice',
    suggestion: 'Write down the pattern/technique used in each problem you struggled with.',
  },
  // ─── DAY 15 ─── Medium
  {
    day: 15, type: 'content', difficulty: 'medium', videoCount: 5,
    tasks: [
      { id: 'd15t1', title: 'Time Based Key-Value Store', leetcode: 981, difficulty: 'medium', duration: 17, topic: 'Binary Search', youtubeUrl: 'https://www.youtube.com/watch?v=u08L8DaDoOU' },
      { id: 'd15t2', title: 'Network Delay Time', leetcode: 743, difficulty: 'medium', duration: 17, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=QKRRjz4KMuE' },
      { id: 'd15t3', title: 'Longest Common Subsequence', leetcode: 1143, difficulty: 'medium', duration: 17, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=g9iNrsBR9BE' },
      { id: 'd15t4', title: 'Open The Lock', leetcode: 752, difficulty: 'medium', duration: 17, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=pe8TZuVeffQ' },
      { id: 'd15t5', title: 'Valid Sudoku', leetcode: 36, difficulty: 'medium', duration: 18, topic: 'Matrix', youtubeUrl: 'https://www.youtube.com/watch?v=q2fl7lUkc8o' },
    ],
  },
  // ─── DAY 16 ─── Medium
  {
    day: 16, type: 'content', difficulty: 'medium', videoCount: 5,
    tasks: [
      { id: 'd16t1', title: 'Design Tic-Tac-Toe', leetcode: 348, difficulty: 'medium', duration: 19, topic: 'Design', youtubeUrl: 'https://www.youtube.com/watch?v=eaBYb0uSfBM' },
      { id: 'd16t2', title: 'Car Fleet', leetcode: 853, difficulty: 'medium', duration: 19, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=TPSiTAFhszA' },
      { id: 'd16t3', title: 'Redundant Connection', leetcode: 684, difficulty: 'medium', duration: 20, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=ctMC5TPuVnM' },
      { id: 'd16t4', title: 'Find First and Last Position of Element in Sorted Array', leetcode: 34, difficulty: 'medium', duration: 21, topic: 'Binary Search', youtubeUrl: 'https://www.youtube.com/watch?v=aPD6g96fRO4' },
      { id: 'd16t5', title: 'Task Scheduler', leetcode: 621, difficulty: 'medium', duration: 21, topic: 'Heap', youtubeUrl: 'https://www.youtube.com/watch?v=IcjlqToRGWI' },
    ],
  },
  // ─── DAY 17 ─── Medium
  {
    day: 17, type: 'content', difficulty: 'medium', videoCount: 5,
    tasks: [
      { id: 'd17t1', title: 'Best Time to Buy and Sell Stock with Cooldown', leetcode: 309, difficulty: 'medium', duration: 21, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=PH5jUN1cNHo' },
      { id: 'd17t2', title: 'Target Sum', leetcode: 494, difficulty: 'medium', duration: 21, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=9QqOX57nMAY' },
      { id: 'd17t3', title: 'Game of Life', leetcode: 289, difficulty: 'medium', duration: 22, topic: 'Matrix', youtubeUrl: 'https://www.youtube.com/watch?v=1FQNMDPZXRc' },
      { id: 'd17t4', title: 'LRU Cache', leetcode: 146, difficulty: 'medium', duration: 22, topic: 'Design', youtubeUrl: 'https://www.youtube.com/watch?v=VPq5dlxaeP8' },
      { id: 'd17t5', title: 'Course Schedule II', leetcode: 210, difficulty: 'medium', duration: 26, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=_RWV4hZdmdk' },
    ],
  },
  // ─── DAY 18 ─── Hard
  {
    day: 18, type: 'content', difficulty: 'hard', videoCount: 5,
    tasks: [
      { id: 'd18t1', title: 'Employee Free Time', leetcode: 759, difficulty: 'hard', duration: 10, topic: 'Intervals', youtubeUrl: 'https://www.youtube.com/watch?v=99l7goR4y0U' },
      { id: 'd18t2', title: 'Max Stack', leetcode: 716, difficulty: 'hard', duration: 12, topic: 'Design', youtubeUrl: 'https://www.youtube.com/watch?v=SyDmmNQFW_I' },
      { id: 'd18t3', title: 'Text Justification', leetcode: 68, difficulty: 'hard', duration: 13, topic: 'Strings', youtubeUrl: 'https://www.youtube.com/watch?v=Pf_1Ox9ud_w' },
      { id: 'd18t4', title: 'Logger Rate Limiter', leetcode: 359, difficulty: 'hard', duration: 14, topic: 'Design', youtubeUrl: 'https://www.youtube.com/watch?v=gYNSX9yVuhQ' },
      { id: 'd18t5', title: 'Swim in Rising Water', leetcode: 778, difficulty: 'hard', duration: 14, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=WYHvHkh9kHQ' },
    ],
  },
  // ─── DAY 19 ─── Hard
  {
    day: 19, type: 'content', difficulty: 'hard', videoCount: 5,
    tasks: [
      { id: 'd19t1', title: 'Longest Valid Parentheses', leetcode: 32, difficulty: 'hard', duration: 15, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=GrSL3c8G6k8' },
      { id: 'd19t2', title: 'Word Ladder', leetcode: 127, difficulty: 'hard', duration: 16, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=isLTjdCw52s' },
      { id: 'd19t3', title: 'First Missing Positive', leetcode: 41, difficulty: 'hard', duration: 16, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=N8DefKVUIKw' },
      { id: 'd19t4', title: 'Reconstruct Itinerary', leetcode: 332, difficulty: 'hard', duration: 16, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=1_bfI1mi6mA' },
      { id: 'd19t5', title: 'Reverse Nodes in K-Group', leetcode: 25, difficulty: 'hard', duration: 17, topic: 'Linked List', youtubeUrl: 'https://www.youtube.com/watch?v=P9_K8M4nnf0' },
    ],
  },
  // ─── DAY 20 ─── Hard
  {
    day: 20, type: 'content', difficulty: 'hard', videoCount: 5,
    tasks: [
      { id: 'd20t1', title: 'Largest Rectangle in Histogram', leetcode: 84, difficulty: 'hard', duration: 17, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=IasMlShanvc' },
      { id: 'd20t2', title: 'Palindrome Partitioning', leetcode: 131, difficulty: 'hard', duration: 17, topic: 'Backtracking', youtubeUrl: 'https://www.youtube.com/watch?v=NWe3W2bMVAU' },
      { id: 'd20t3', title: 'Sliding Window Maximum', leetcode: 239, difficulty: 'hard', duration: 19, topic: 'Arrays', youtubeUrl: 'https://www.youtube.com/watch?v=GIYk1wit12k' },
      { id: 'd20t4', title: 'Interleaving String', leetcode: 97, difficulty: 'hard', duration: 21, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=KXIK863L9tk' },
      { id: 'd20t5', title: 'Longest Increasing Path in a Matrix', leetcode: 329, difficulty: 'hard', duration: 23, topic: 'Graphs', youtubeUrl: 'https://www.youtube.com/watch?v=gvwTGXP-reQ' },
    ],
  },
  // ─── DAY 21 ─── Practice
  {
    day: 21, type: 'practice',
    suggestion: 'Time yourself: pick 2 medium problems and solve each in under 25 minutes.',
  },
  // ─── DAY 22 ─── Hard
  {
    day: 22, type: 'content', difficulty: 'hard', videoCount: 5,
    tasks: [
      { id: 'd22t1', title: 'N-Queens', leetcode: 51, difficulty: 'hard', duration: 23, topic: 'Backtracking', youtubeUrl: 'https://www.youtube.com/watch?v=MOrMPEq6P5w' },
      { id: 'd22t2', title: 'Design Twitter', leetcode: 355, difficulty: 'hard', duration: 26, topic: 'Design', youtubeUrl: 'https://www.youtube.com/watch?v=esZ4vvjwW6E' },
      { id: 'd22t3', title: 'Median of Two Sorted Arrays', leetcode: 4, difficulty: 'hard', duration: 27, topic: 'Binary Search', youtubeUrl: 'https://www.youtube.com/watch?v=LRM4qiHLYCE' },
      { id: 'd22t4', title: 'Regular Expression Matching', leetcode: 10, difficulty: 'hard', duration: 27, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=VFQddcCP46c' },
      { id: 'd22t5', title: 'Race Car', leetcode: 818, difficulty: 'hard', duration: 28, topic: 'Dynamic Programming', youtubeUrl: 'https://www.youtube.com/watch?v=TAXt_TkSNfw' },
    ],
  },
  // ─── DAY 23 ─── Final
  {
    day: 23, type: 'content', difficulty: 'hard', videoCount: 1,
    tasks: [
      { id: 'd23t1', title: 'Find Median from Data Stream', leetcode: 295, difficulty: 'hard', duration: 29, topic: 'Heap', youtubeUrl: 'https://www.youtube.com/watch?v=IKpM6Q8wTIY' },
    ],
  },
];

export const bonusCourses: BonusCourse[] = [
  { id: 'bc1', title: 'Array Interview Questions | Top 10 Full Course', topic: 'Arrays', duration: '2.1 hr', durationMinutes: 126 },
  { id: 'bc2', title: 'String Interview Questions | Full FAANG Course', topic: 'Strings', duration: '2.3 hr', durationMinutes: 138 },
  { id: 'bc3', title: 'Strings for Coding Interviews | Full Course', topic: 'Strings', duration: '3.4 hr', durationMinutes: 204 },
  { id: 'bc4', title: 'Hashing Interview Questions | Full DSA Course', topic: 'Hashing', duration: '1.0 hr', durationMinutes: 60 },
  { id: 'bc5', title: 'Linked List Interview Questions | Full FAANG Course', topic: 'Linked List', duration: '1.9 hr', durationMinutes: 114 },
  { id: 'bc6', title: 'Tree Algorithms For Interviews | Full FAANG Course', topic: 'Trees', duration: '2.8 hr', durationMinutes: 168 },
  { id: 'bc7', title: 'Tree Data Structures for Interviews | Full Course', topic: 'Trees', duration: '4.5 hr', durationMinutes: 270 },
  { id: 'bc8', title: 'Binary Search Full Course for Coding Interviews', topic: 'Binary Search', duration: '2.0 hr', durationMinutes: 120 },
  { id: 'bc9', title: 'Sorting Algorithms Full Course for Interviews', topic: 'Sorting', duration: '51 min', durationMinutes: 51 },
  { id: 'bc10', title: 'Backtracking for Coding Interviews | Full Course', topic: 'Backtracking', duration: '2.8 hr', durationMinutes: 168 },
  { id: 'bc11', title: 'Graph Algorithms For Interviews | Full DSA Course', topic: 'Graphs', duration: '4.1 hr', durationMinutes: 246 },
  { id: 'bc12', title: 'Graph Algorithms for Coding Interviews | Full Course', topic: 'Graphs', duration: '7.3 hr', durationMinutes: 438 },
  { id: 'bc13', title: 'Dynamic Programming Interviews | Full DSA Course', topic: 'Dynamic Programming', duration: '4.0 hr', durationMinutes: 240 },
  { id: 'bc14', title: 'Dynamic Programming for Interviews | Full Course', topic: 'Dynamic Programming', duration: '6.7 hr', durationMinutes: 402 },
  { id: 'bc15', title: 'Intervals Interview Questions | Full DSA Course', topic: 'Intervals', duration: '1.4 hr', durationMinutes: 84 },
  { id: 'bc16', title: 'Matrix Interview Questions | 7 LeetCode Problems', topic: 'Matrix', duration: '2.2 hr', durationMinutes: 132 },
  { id: 'bc17', title: 'Heap & Priority Queue Full Course for Interviews', topic: 'Heap', duration: '3.5 hr', durationMinutes: 210 },
  { id: 'bc18', title: 'Bit Manipulation Interviews | Full FAANG Course', topic: 'Bit Manipulation', duration: '1.2 hr', durationMinutes: 72 },
  { id: 'bc19', title: 'Queue Full Course | DSA Interview Prep', topic: 'Queue', duration: '1.2 hr', durationMinutes: 72 },
  { id: 'bc20', title: 'DSA Coding Patterns | Full Interview Prep Course', topic: 'DSA Patterns', duration: '4.0 hr', durationMinutes: 240 },
  { id: 'bc21', title: 'Blind 75 LeetCode Java Part 2 | Algorithms Course', topic: 'Blind 75', duration: '8.1 hr', durationMinutes: 486 },
  { id: 'bc22', title: 'Blind 75 LeetCode Java | Full Coding Interview Course', topic: 'Blind 75', duration: '11.7 hr', durationMinutes: 702 },
];

// Helper to get all tasks
export function getAllTasks() {
  return curriculum
    .filter((d): d is import('../types').ContentDay => d.type === 'content')
    .flatMap((d) => d.tasks);
}

// Total video count
export const TOTAL_VIDEOS = getAllTasks().length;

// Helper to get day data
export function getDayData(dayNumber: number): Day | undefined {
  return curriculum.find((d) => d.day === dayNumber);
}

// Get total estimated time in minutes
export function getTotalEstimatedMinutes(): number {
  return getAllTasks().reduce((sum, t) => sum + t.duration, 0);
}
