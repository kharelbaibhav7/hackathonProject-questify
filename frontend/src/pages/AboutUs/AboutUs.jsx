import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, MessageSquare, Brain, Trophy, Zap, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Component for section headers
  const SectionHeader = ({ icon, title }) => (
    <div className="flex items-center mb-4 text-teal-600">
      {icon}
      <h2 className="text-2xl font-bold ml-2">{title}</h2>
    </div>
  );

  // Component for feature cards
  const FeatureCard = ({ icon, title, description }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500 hover:shadow-lg transition-shadow"
    >
      <div className="text-teal-600 mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

  return (
    <div className="bg-gradient-to-br from-teal-50 to-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 p-3 bg-teal-100 rounded-full"
        >
          <Heart size={40} className="text-teal-600" />
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Welcome to <span className="text-teal-600">Questify</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Empowering individuals to overcome challenges like stuttering, ADHD, and isolation through personalized, engaging, and accessible solutions.
        </p>
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teal-600 text-white px-8 py-3 rounded-full font-medium flex items-center mx-auto hover:bg-teal-700 transition-colors"
        >
          Start Your Journey
          <ArrowRight size={18} className="ml-2" />
        </motion.button> */}
      </motion.section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <SectionHeader
              icon={<Zap size={28} />}
              title="Our Mission"
            />
            <p className="text-gray-600 mb-6">
              Questify was born out of a simple yet powerful idea: mental health and wellbeing should be accessible to everyone. We understand that challenges like stuttering, ADHD, and isolation can feel overwhelming, but we also know that with the right tools and support, anyone can make progress.
            </p>
            <p className="text-gray-600">
              Our goal is to break down barriers to care by combining cutting-edge technology with human expertise, making therapy engaging, effective, and stigma-free.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-teal-100 p-8 rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200 rounded-bl-full opacity-70" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-teal-800 mb-4">Every small step can lead to big changes</h3>
              <ul className="space-y-3">
                {['Expert guidance', 'Self-help tools', 'Community support', 'Daily progress tracking'].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="flex items-center text-gray-700"
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-600 mr-2" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-xl shadow-sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <SectionHeader
            icon={<Brain size={28} className="mx-auto" />}
            title="How Questify Works"
          />
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our personalized approach adapts to your unique needs, combining AI technology with human expertise
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              step: "01",
              title: "Personalized Assessment",
              description: "Answer a few simple questions to help our AI system understand your needs and recommend the best path forward.",
              icon: <Brain size={32} />
            },
            {
              step: "02",
              title: "Tailored Solutions",
              description: "For serious issues, connect with high-profile professionals. For milder challenges, access AI-driven self-help tools.",
              icon: <Award size={32} />
            },
            {
              step: "03",
              title: "Gamified Progress",
              description: "Complete fun daily quests that help reduce your problems while building confidence, with AI support along the way.",
              icon: <Trophy size={32} />
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-teal-50 rounded-lg p-6 relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                {item.step}
              </div>
              <div className="mt-4 text-teal-600 mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <SectionHeader
              icon={<Award size={28} className="mx-auto" />}
              title="What Makes Us Different"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Trophy size={32} />}
              title="Gamified Approach"
              description="Our engaging game-like experience keeps users motivated and committed to their wellbeing journey."
            />
            <FeatureCard
              icon={<Zap size={32} />}
              title="Tech & Human Hybrid"
              description="We combine the best of technology and human care for truly personalized solutions."
            />
            <FeatureCard
              icon={<Users size={32} />}
              title="Community Connection"
              description="Our platform fosters meaningful connections, ensuring no one has to face their challenges alone."
            />
          </div>
        </motion.div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="bg-gradient-to-r from-teal-600 to-teal-400 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 text-white">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                <p className="mb-6">
                  Connect with others facing similar challenges in our safe, supportive forum. Share experiences, find encouragement, and realize you're not alone.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-teal-600 px-6 py-3 rounded-full font-medium inline-flex items-center hover:bg-teal-50 transition-colors"
                >
                  <MessageSquare size={18} className="mr-2" />
                  Join the Conversation
                </motion.button>
              </motion.div>
            </div>
            <div className="bg-teal-500 relative hidden md:block">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent opacity-30" />
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${Math.random() * 6 + 2}rem`,
                      height: `${Math.random() * 6 + 2}rem`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.3
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Users size={120} className="text-white opacity-80" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Team & Future Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm">
            <SectionHeader
              icon={<Users size={24} />}
              title="Our Team"
            />
            <p className="text-gray-600 mb-4">
              Questify was created by a passionate team of developers, designers, and mental health advocates. We're united by a shared vision: to make wellbeing accessible, engaging, and effective for everyone.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['Developers', 'Designers', 'Mental Health Experts', 'Advocates'].map((tag, i) => (
                <span key={i} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm">
            <SectionHeader
              icon={<Zap size={24} />}
              title="Our Future"
            />
            <p className="text-gray-600 mb-4">
              We're just getting started. In the future, we plan to expand our features, grow our community, and enhance our AI capabilities to help even more people. Our ultimate goal is to create a world where everyone has the tools and support they need to grow.
            </p>
            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-teal-600 font-medium inline-flex items-center border-b-2 border-teal-600 pb-1 hover:text-teal-700 transition-colors"
              >
                Learn about our roadmap
                <ArrowRight size={16} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Take the first step towards a healthier, happier you
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Sign up today and start your journey with Questify. Together, we can turn small steps into big changes.
          </p>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-600 text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-teal-700 transition-colors shadow-lg"
          >
            Begin Your Questify Journey
          </motion.button> */}
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;