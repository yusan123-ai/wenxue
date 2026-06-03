import HeroSection from '@/components/sections/HeroSection';
import CategoryNav from '@/components/sections/CategoryNav';
import FeaturedWorks from '@/components/sections/FeaturedWorks';

const Home = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoryNav />
      <FeaturedWorks />
    </main>
  );
};

export default Home;
