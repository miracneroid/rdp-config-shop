
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Define the available 3D character avatars
const characterAvatars = [
  { id: "robot1", name: "Robo Blue", imageUrl: "/avatars/robot-blue.png" },
  { id: "robot2", name: "Robo Red", imageUrl: "/avatars/robot-red.png" },
  { id: "robot3", name: "Robo Green", imageUrl: "/avatars/robot-green.png" },
  { id: "human1", name: "Human 1", imageUrl: "/avatars/human1.png" },
  { id: "human2", name: "Human 2", imageUrl: "/avatars/human2.png" },
  { id: "human3", name: "Human 3", imageUrl: "/avatars/human3.png" },
  { id: "fantasy1", name: "Elf", imageUrl: "/avatars/elf.png" },
  { id: "fantasy2", name: "Dwarf", imageUrl: "/avatars/dwarf.png" },
  { id: "fantasy3", name: "Mage", imageUrl: "/avatars/mage.png" },
];

// Group avatars by category
const avatarCategories = {
  robots: characterAvatars.filter(avatar => avatar.id.startsWith("robot")),
  humans: characterAvatars.filter(avatar => avatar.id.startsWith("human")),
  fantasy: characterAvatars.filter(avatar => avatar.id.startsWith("fantasy")),
};

interface AvatarSelectorProps {
  onAvatarSelected: (avatarUrl: string, character: string) => void;
  currentCharacter: string | null;
}

const AvatarSelector = ({ onAvatarSelected, currentCharacter }: AvatarSelectorProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(currentCharacter);
  
  const handleAvatarClick = (avatar: { id: string; imageUrl: string }) => {
    setSelectedAvatar(avatar.id);
  };
  
  const handleConfirm = () => {
    if (selectedAvatar) {
      const avatar = characterAvatars.find(a => a.id === selectedAvatar);
      if (avatar) {
        onAvatarSelected(avatar.imageUrl, avatar.id);
      }
    }
  };
  
  return (
    <div className="w-full space-y-4">
      <Tabs defaultValue="robots">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="robots">Robots</TabsTrigger>
          <TabsTrigger value="humans">Humans</TabsTrigger>
          <TabsTrigger value="fantasy">Fantasy</TabsTrigger>
        </TabsList>
        
        {Object.entries(avatarCategories).map(([category, avatars]) => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className={cn(
                    "flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all",
                    selectedAvatar === avatar.id
                      ? "bg-primary/10 ring-2 ring-primary"
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleAvatarClick(avatar)}
                >
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src={avatar.imageUrl} alt={avatar.name} />
                    <AvatarFallback>{avatar.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-center">{avatar.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="flex justify-end">
        <Button
          onClick={handleConfirm}
          disabled={!selectedAvatar}
        >
          Apply Avatar
        </Button>
      </div>
    </div>
  );
};

export default AvatarSelector;
