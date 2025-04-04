import { ProfileType } from "@/util/type";

export const getProflies = async (): Promise<ProfileType[]> => {
  return [
    {
      id: 1,
      name: "togoo",
      about: "togoo's profile",
      avatarImage: "",
      socialMediaURL: "facebook.com",
      backgroundImage: "ImageURL.com",
      successMessage: "goodluck for your new project",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "john doe",
      about: "Software developer and tech enthusiast",
      avatarImage: "john_avatar.png",
      socialMediaURL: "twitter.com/johndoe",
      backgroundImage: "john_background.com",
      successMessage: "Keep building amazing things!",
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "anna schmidt",
      about: "Passionate photographer and travel blogger",
      avatarImage: "anna_avatar.png",
      socialMediaURL: "instagram.com/annaschmidt",
      backgroundImage: "anna_background.com",
      successMessage: "Wishing you endless adventures!",
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: "lucas dubois",
      about: "Freelance graphic designer",
      avatarImage: "lucas_avatar.png",
      socialMediaURL: "linkedin.com/in/lucasdubois",
      backgroundImage: "lucas_background.com",
      successMessage: "Your designs are truly inspiring!",
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: "sakura tanaka",
      about: "Digital artist and illustrator",
      avatarImage: "sakura_avatar.png",
      socialMediaURL: "artstation.com/sakuratanaka",
      backgroundImage: "sakura_background.com",
      successMessage: "Your art brings joy to the world!",
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      name: "arjun sharma",
      about: "Tech entrepreneur and startup mentor",
      avatarImage: "arjun_avatar.png",
      socialMediaURL: "linkedin.com/in/arjunsharma",
      backgroundImage: "arjun_background.com",
      successMessage: "Keep pushing the boundaries of innovation!",
      userId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};
