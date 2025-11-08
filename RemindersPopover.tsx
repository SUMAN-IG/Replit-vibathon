import { Bell } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { motion } from 'motion/react';

const mockReminders = [
  {
    id: 1,
    title: 'Team standup meeting',
    time: '2:00 PM',
    category: 'Business',
  },
  {
    id: 2,
    title: 'Review design mockups',
    time: '3:30 PM',
    category: 'Business',
  },
  {
    id: 3,
    title: 'Update Instagram profile',
    time: '5:00 PM',
    category: 'Personal',
  },
  {
    id: 4,
    title: 'Call with client',
    time: '6:00 PM',
    category: 'Business',
  },
];

export function RemindersPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 rounded-xl bg-[#1C1F26] border border-[#232834] text-white/60 hover:text-white hover:border-purple-500/30 transition-all duration-200"
        >
          <Bell className="w-5 h-5" />
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-[10px] text-white">
            {mockReminders.length}
          </div>
        </motion.button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 bg-[#1C1F26] border-[#232834] p-0 overflow-hidden" 
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/5">
          <div className="flex items-center justify-between">
            <h3 className="text-white">Reminders Today</h3>
            <span className="text-xs text-white/40">{mockReminders.length} items</span>
          </div>
        </div>

        {/* Reminders List */}
        <div className="max-h-96 overflow-y-auto">
          {mockReminders.map((reminder, index) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-white/90 text-sm mb-1">{reminder.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">{reminder.time}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {reminder.category}
                    </span>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/5 bg-white/5">
          <button className="w-full text-sm text-purple-400 hover:text-purple-300 transition-colors">
            View all reminders
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
