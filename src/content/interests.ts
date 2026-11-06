export const photography = {
  intro:
    "I like frames that feel like a place rather than a postcard. Travel, cars and the ordinary moments in between tend to get most of my attention.",
  note:
    "The contact sheet below is made from stand-in frames. Real photos will replace them once I've actually sorted the scans.",
  frames: [
    {
      id: "travel",
      label: "Travel",
      caption: "Somewhere with a road and no particular plan.",
      tone: "teal",
      scene: "road",
    },
    {
      id: "automotive",
      label: "Automotive",
      caption: "The details that make a car worth a second look.",
      tone: "amber",
      scene: "car",
    },
    {
      id: "friends",
      label: "Moments",
      caption: "The photos nobody poses for, which are usually the best ones.",
      tone: "plum",
      scene: "people",
    },
  ],
} as const;

export const film = {
  intro:
    "I edit montages from films and TV shows. Finding the cut that lands on the beat, or the shot that makes a scene feel new, is its own kind of problem solving.",
  timeline: ["cold open", "the quiet bit", "beat drop", "one last look", "credits"],
  note: "Most of my editing is a private experiment folder for now. The good ones eventually escape.",
} as const;

export const gaming = {
  intro:
    "Story first. If a game gives me a good reason to care about its characters, I'll stay for the side quests. I'm much more interested in a world I remember than a scoreboard I forget.",
  tags: ["Story-driven", "Single-player", "Good writing", "A world worth exploring"],
} as const;

export const football = {
  intro:
    "Weekend football, usually followed by a longer discussion about the offside rule than the match itself. I'm better at watching than explaining, depending on who you ask.",
  notes: ["Weekend matches", "The beautiful game", "Arguments from the couch"],
} as const;

export const movies = {
  intro:
    "Horror and comedy are my two most reliable genres, especially with the right group. A film that can make a room go quiet and then laugh at itself is doing something right.",
  tickets: [
    { title: "Horror", detail: "For the build-up and the terrible decisions." },
    { title: "Comedy", detail: "For the timing, and the rewatch value." },
    { title: "Both", detail: "The sweet spot. Rare, but worth it." },
  ],
} as const;

export const fragrance = {
  intro:
    "I like reading a fragrance's notes before I smell it, then finding out how wrong I was. This part of the portfolio is a notebook more than a collection: what I tried, how it opened, and how it actually performed.",
  notes: {
    top: ["Citrus", "Green", "A little sharp"],
    heart: ["Floral", "Spice", "Woody"],
    base: ["Musk", "Amber", "Warm"],
  },
  weather:
    "The Indian weather is the real reviewer here. Heat and humidity can change a fragrance's whole personality by lunchtime.",
} as const;
