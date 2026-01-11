
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Shapes } from 'lucide-react';

interface HomeProps {
  onSelectTracing: () => void;
}

export const Home = ({ onSelectTracing }: HomeProps) => {
  return (
    <Layout className="bg-sky-100">
      <div className="flex flex-col items-center justify-center h-full gap-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-6xl md:text-8xl font-black text-blue-600 tracking-wider drop-shadow-xl">
            快樂小手
            <br />
            <span className="text-pink-500">運筆練習</span>
          </h1>
          <p className="text-2xl text-slate-600 font-medium">
            選擇一個好玩的遊戲吧！
          </p>
        </motion.div>

        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelectTracing}
          className="mt-8 bg-purple-500 text-white rounded-xl px-12 py-6 flex items-center gap-4 shadow-lg hover:bg-purple-600 transition-colors"
        >
          <span className="text-3xl font-bold">進入運筆練習</span>
          <Shapes size={32} />
        </motion.button>

      </div>
    </Layout>
  );
};
