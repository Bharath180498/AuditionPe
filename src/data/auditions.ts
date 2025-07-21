export type Role = {
  id: string;
  name: string;
  gender: "Male" | "Female" | "Any";
  ageRange: [number, number];
  description: string;
};

export type Audition = {
  id: string;
  title: string;
  description: string;
  category: "Film" | "TV" | "Ad";
  location: string;
  roles: Role[];
};

export const auditions: Audition[] = [
  {
    id: "1",
    title: "Upcoming Bollywood Blockbuster",
    description: "A major production house is looking for fresh faces for their next big movie. This is a great opportunity for aspiring actors to showcase their talent.",
    category: "Film",
    location: "Mumbai",
    roles: [
      {
        id: "1-1",
        name: "Lead Actor",
        gender: "Male",
        ageRange: [25, 35],
        description: "The protagonist of the story. Should be charismatic and have a strong screen presence.",
      },
      {
        id: "1-2",
        name: "Lead Actress",
        gender: "Female",
        ageRange: [22, 30],
        description: "The female lead. Should be a versatile actress with good dancing skills.",
      },
    ],
  },
  {
    id: "2",
    title: "New Web Series",
    description: "A popular OTT platform is casting for their new web series. It's a gripping thriller with a lot of scope for performance.",
    category: "TV",
    location: "Delhi",
    roles: [
      {
        id: "2-1",
        name: "Supporting Actor",
        gender: "Male",
        ageRange: [30, 45],
        description: "A key character with a mysterious past. Should be able to portray complex emotions.",
      },
    ],
  },
  {
    id: "3",
    title: "Major Ad Campaign",
    description: "A well-known brand is looking for models for their upcoming ad campaign. The ad will be shot in Bangalore and will be aired nationwide.",
    category: "Ad",
    location: "Bangalore",
    roles: [
      {
        id: "3-1",
        name: "Model",
        gender: "Any",
        ageRange: [18, 28],
        description: "Should have a pleasant personality and be comfortable in front of the camera.",
      },
    ],
  },
]; 