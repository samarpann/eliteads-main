import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Clock, ArrowRight, Tag } from "lucide-react";

const posts = [
  {
    title: "iOS 17 Privacy Changes: What Marketers Need to Know",
    excerpt: "Apple's latest privacy updates are here. Learn how to adapt your tracking and attribution strategies to maintain campaign performance.",
    category: "Tracking",
    readTime: "8 min",
    date: "Jan 15, 2025",
    gradient: "from-blue-500 to-cyan-500",
    featured: true
  },
  {
    title: "Scaling Facebook Ads to $1M/Month: A Case Study",
    excerpt: "How we took an e-commerce brand from $50k to $1M monthly ad spend while improving ROAS by 340%.",
    category: "Case Study",
    readTime: "12 min",
    date: "Jan 10, 2025",
    gradient: "from-purple-500 to-pink-500",
    featured: true
  },
  {
    title: "The Future of Affiliate Marketing in 2025",
    excerpt: "Emerging trends, new networks, and strategies that are reshaping the affiliate landscape.",
    category: "Affiliate",
    readTime: "6 min",
    date: "Jan 5, 2025",
    gradient: "from-green-500 to-emerald-500",
    featured: false
  },
  {
    title: "Server-Side Tracking: Complete Implementation Guide",
    excerpt: "Step-by-step guide to implementing server-side tracking for accurate attribution in a cookieless world.",
    category: "Technical",
    readTime: "15 min",
    date: "Dec 28, 2024",
    gradient: "from-orange-500 to-red-500",
    featured: false
  },
  {
    title: "Creative Testing at Scale: Our Framework",
    excerpt: "How we test 10,000+ ad variations per month to find winning creatives faster.",
    category: "Creative",
    readTime: "10 min",
    date: "Dec 20, 2024",
    gradient: "from-cyan-500 to-blue-500",
    featured: false
  },
  {
    title: "TikTok Ads Mastery: Beyond the Basics",
    excerpt: "Advanced TikTok advertising strategies that most agencies won't tell you about.",
    category: "Platforms",
    readTime: "9 min",
    date: "Dec 15, 2024",
    gradient: "from-pink-500 to-purple-500",
    featured: false
  },
];

const BlogSection = () => {
  const featuredPosts = posts.filter(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
            INSIGHTS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Articles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert insights, case studies, and strategies from the front lines of performance marketing.
          </p>
        </ScrollReveal>

        {/* Featured posts */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-8" staggerDelay={0.15}>
          {featuredPosts.map((post) => (
            <StaggerItem key={post.title} animation="fadeUp">
              <motion.article
                className="group relative h-full p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 backdrop-blur-sm transition-all duration-500 cursor-pointer"
                whileHover={{ y: -5 }}
              >
                {/* Category badge */}
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${post.gradient} text-white text-xs font-medium mb-4`}>
                  <Tag className="w-3 h-3" />
                  {post.category}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <motion.div
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>

                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Regular posts grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" staggerDelay={0.1}>
          {regularPosts.map((post) => (
            <StaggerItem key={post.title} animation="fadeUp">
              <motion.article
                className="group relative p-3 md:p-5 rounded-xl bg-card/30 border border-border/30 hover:border-primary/20 backdrop-blur-sm transition-all duration-300 cursor-pointer"
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${post.gradient}`} />
                  <span className="text-xs text-muted-foreground">{post.category}</span>
                </div>
                <h4 className="text-xs md:text-sm font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View all button */}
        <ScrollReveal animation="fadeUp" delay={0.4} className="text-center mt-12">
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary/50 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BlogSection;
