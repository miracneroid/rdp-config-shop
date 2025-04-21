
import { Docs, Wiki, Projects, NotionAi, Calendar, Goals, Sites, Templates } from 'lucide-react';

const featureList = [
  {
    name: 'Docs',
    description: 'Build any page, communicate any idea.',
    icon: Docs,
  },
  {
    name: 'Wiki',
    description: 'One home base for all your knowledge.',
    icon: Wiki,
  },
  {
    name: 'Projects',
    description: 'Manage any project from beginning to end.',
    icon: Projects,
  },
  {
    name: 'Notion AI',
    description: 'Finds what you need. Does what you need.',
    icon: NotionAi,
  },
  {
    name: 'Calendar',
    description: 'See all your commitments in one place.',
    icon: Calendar,
  },
  {
    name: 'Goals',
    description: "Track progress toward what’s most important.",
    icon: Goals,
  },
  {
    name: 'Sites',
    description: 'Make any page a website in minutes.',
    icon: Sites,
  },
  {
    name: 'Templates',
    description: 'Get started with one of 30,000+ templates.',
    icon: Templates,
  },
];

const NotionFeatures = () => {
  return (
    <section className="w-full border-t border-gray-200 bg-white py-14 sm:py-20">
      <div className="w-full px-2 sm:px-10">
        <h2 className="text-4xl sm:text-[44px] md:text-[52px] font-bold text-black leading-tight mb-14 mt-2" style={{ letterSpacing: "-0.03em" }}>
          Everything you need<br className="hidden sm:block" />
          to do your best work.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 w-full">
          {featureList.map(({ name, icon: Icon, description }) => (
            <div key={name} className="flex flex-col items-start group">
              <Icon className="h-14 w-14 mb-4 text-black" strokeWidth={1.6} />
              <div>
                <h3 className="font-semibold text-lg md:text-xl text-black flex items-center gap-1 mb-1 group-hover:underline group-hover:underline-offset-4 transition">
                  {name} <span aria-hidden>→</span>
                </h3>
                <p className="text-base text-gray-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotionFeatures;
