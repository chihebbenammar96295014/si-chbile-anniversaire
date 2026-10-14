'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import {
  BookMarked,
  BookOpen,
  ChevronDown,
  Library,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

const easeOut = [0.22, 1, 0.36, 1] as const

function FloatingPages() {
  const [pages, setPages] = useState<
    Array<{ id: number; x: number; y: number; delay: number; size: number; rotate: number }>
  >([])

  useEffect(() => {
    setPages(
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        size: 12 + Math.random() * 16,
        rotate: Math.random() * 40 - 20,
      })),
    )
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pages.map((page) => (
        <motion.div
          key={page.id}
          className="absolute rounded-[2px] border border-[#c9a227]/35"
          style={{
            left: `${page.x}%`,
            top: `${page.y}%`,
            width: page.size,
            height: page.size * 1.4,
            background:
              'linear-gradient(135deg, rgba(240,230,200,0.55), rgba(232,242,238,0.35))',
            boxShadow: '0 4px 12px rgba(15,42,36,0.08)',
          }}
          animate={{
            y: [0, -32, 0],
            x: [0, page.id % 2 === 0 ? 18 : -18, 0],
            rotate: [page.rotate, page.rotate + 12, page.rotate],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: 6 + (page.id % 4),
            delay: page.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function FallingConfetti() {
  const pieces = Array.from({ length: 32 }).map((_, i) => ({
    id: i,
    left: (i * 31) % 100,
    delay: (i % 10) * 0.28,
    duration: 3.2 + (i % 6) * 0.5,
    color: ['#c9a227', '#3d7a66', '#1a4a3c', '#f0e6c8'][i % 4],
    w: i % 3 === 0 ? 5 : i % 3 === 1 ? 8 : 4,
    h: i % 3 === 0 ? 12 : i % 3 === 1 ? 5 : 8,
    round: i % 4 === 0,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className={p.round ? 'absolute rounded-full' : 'absolute rounded-[1px]'}
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
          }}
          initial={{ top: '-8%', opacity: 0, rotate: 0 }}
          animate={{
            top: '110%',
            opacity: [0, 0.9, 0.9, 0],
            rotate: [0, 260, 520],
            x: [0, p.id % 2 === 0 ? 40 : -40, p.id % 3 === 0 ? 20 : -20],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function OrbitingIcons() {
  const icons = [BookOpen, Star, Sparkles, BookMarked]
  return (
    <div className="relative w-40 h-40 mx-auto mb-10">
      <motion.div
        className="absolute inset-0 rounded-full border border-[#c9a227]/40"
        animate={{ rotate: 360, scale: [1, 1.04, 1] }}
        transition={{
          rotate: { duration: 18, repeat: Infinity, ease: 'linear' },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        className="absolute inset-2 rounded-full border border-dashed border-[#3d7a66]/35"
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-[-8px] rounded-full border border-[#c9a227]/15 ring-pulse"
      />
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          animate={{ rotate: 360 }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: 0, height: 0 }}
        >
          <div
            className="absolute text-[#1a4a3c]"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-64px)`,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, delay: i * 0.35, repeat: Infinity }}
              className="bg-white/50 backdrop-blur-sm rounded-full p-1.5 shadow-sm"
            >
              <Icon size={16} />
            </motion.div>
          </div>
        </motion.div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, 4, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Library size={44} className="text-[#1a4a3c] pulse-glow" />
        </motion.div>
      </div>
    </div>
  )
}

function HeroSection() {
  const brand = 'Si Chbile'
  const letters = brand.split('')
  const sectionRef = useRef<HTMLElement>(null)

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mx', `${x}%`)
    e.currentTarget.style.setProperty('--my', `${y}%`)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative min-h-screen flex items-center justify-center gradient-library pt-16 pb-20 overflow-hidden noise-overlay"
      style={{ ['--mx' as string]: '50%', ['--my' as string]: '50%' }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="aurora w-[70vmin] h-[70vmin] rounded-full" />
      </div>

      <div className="absolute inset-0 spotlight pointer-events-none" />

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            left: `${8 + i * 18}%`,
            top: `${12 + (i % 3) * 28}%`,
            background:
              i % 2 === 0
                ? 'rgba(201,162,39,0.18)'
                : 'rgba(61,122,102,0.16)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            opacity: [0.25, 0.5, 0.25],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + i,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-4 text-center">
        <OrbitingIcons />

        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.15, duration: 0.8, ease: easeOut }}
          className="text-sm md:text-base tracking-[0.4em] uppercase text-[#3d7a66] mb-5 font-medium"
        >
          Aujourd&apos;hui on fête
        </motion.p>

        <h1
          className="text-7xl sm:text-8xl md:text-[9.5rem] font-bold mb-6 leading-[0.9] text-gradient-gold"
          style={{ fontFamily: 'var(--font-display)' }}
          aria-label="Si Chbile"
        >
          <span className="inline-flex flex-wrap justify-center">
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ opacity: 0, y: 60, rotateX: -90, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: [0, i % 2 === 0 ? -8 : 8, 0],
                  rotateX: 0,
                  scale: 1,
                }}
                transition={{
                  opacity: { delay: 0.3 + i * 0.07, duration: 0.5, ease: easeOut },
                  rotateX: { delay: 0.3 + i * 0.07, duration: 0.55, ease: easeOut },
                  scale: { delay: 0.3 + i * 0.07, duration: 0.55, ease: easeOut },
                  y: {
                    delay: 1.4 + i * 0.04,
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className="inline-block px-[0.01em]"
                whileHover={{ scale: 1.15, y: -12, color: '#c9a227' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 1, ease: easeOut }}
          className="mx-auto h-[3px] w-36 md:w-52 shimmer-line mb-10 origin-center rounded-full"
        />

        <motion.div
          className="mt-4"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={32} className="mx-auto text-[#c9a227] drop-shadow-lg" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function AnimatedCounter({
  target,
  suffix = '',
  label,
}: {
  target: number
  suffix?: string
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 50, damping: 18 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) motionValue.set(target)
  }, [inView, motionValue, target])

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: easeOut }}
      whileHover={{ scale: 1.06 }}
      className="relative text-center px-10 py-8"
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-[#c9a227]/30"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-[-12px] rounded-full border border-[#c9a227]/15"
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3.5, delay: 0.4, repeat: Infinity }}
      />
      <p
        className="relative text-7xl md:text-8xl font-bold text-[#c9a227] mb-3 drop-shadow-[0_0_30px_rgba(201,162,39,0.35)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {display}
        {suffix}
      </p>
      <p className="relative text-base md:text-lg text-[#e8f2ee]/90 tracking-[0.2em] uppercase">
        {label}
      </p>
    </motion.div>
  )
}

function StatsSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 gradient-deep overflow-hidden noise-overlay">
      <motion.div
        className="absolute -left-24 top-0 w-80 h-80 rounded-full bg-[#c9a227]/15 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-20 bottom-0 w-96 h-96 rounded-full bg-[#3d7a66]/25 blur-3xl"
        animate={{ x: [0, -40, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <div className="container relative z-10 mx-auto max-w-5xl">
        <div className="flex justify-center">
          <AnimatedCounter target={75} label="jours" />
        </div>
      </div>
    </section>
  )
}

function BookShelf() {
  const books = [
    { h: 110, c: '#1a4a3c', delay: 0 },
    { h: 145, c: '#c9a227', delay: 0.07 },
    { h: 125, c: '#3d7a66', delay: 0.14 },
    { h: 160, c: '#0f2a24', delay: 0.21 },
    { h: 130, c: '#a8861a', delay: 0.28 },
    { h: 150, c: '#2d6a56', delay: 0.35 },
    { h: 118, c: '#c9a227', delay: 0.42 },
    { h: 140, c: '#1a4a3c', delay: 0.49 },
    { h: 122, c: '#3d7a66', delay: 0.56 },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#e8f2ee] via-[#f0f7f4] to-[#f7faf8] overflow-hidden relative">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-[#c9a227]/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-[#3d7a66] mb-12 text-sm tracking-[0.28em] uppercase"
        >
          75 jours de rires et de travail ensemble
        </motion.p>
        <div className="flex items-end justify-center gap-1.5 md:gap-2.5 h-48 perspective-card">
          {books.map((b, i) => (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0, rotateX: 40 }}
              whileInView={{ height: b.h, opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: b.delay, duration: 0.7, type: 'spring', stiffness: 120 }}
              animate={{
                y: [0, i % 2 === 0 ? -10 : 10, 0],
              }}
              whileHover={{
                y: -24,
                scaleY: 1.06,
                filter: 'brightness(1.15)',
                boxShadow: '0 12px 24px rgba(15,42,36,0.25)',
              }}
              className="w-6 md:w-9 rounded-t-[3px] origin-bottom cursor-pointer"
              style={{
                background: `linear-gradient(90deg, ${b.c}ee, ${b.c}, ${b.c}cc)`,
                boxShadow: '3px 0 0 rgba(0,0,0,0.15), inset 1px 0 0 rgba(255,255,255,0.15)',
              }}
            >
              <motion.div
                className="h-full w-[2px] mx-auto bg-white/25"
                animate={{ opacity: [0.15, 0.45, 0.15] }}
                transition={{ duration: 2 + i * 0.15, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="h-2.5 bg-gradient-to-r from-[#0f2a24]/60 via-[#1a4a3c] to-[#0f2a24]/60 rounded-sm origin-center shadow-md"
        />
      </div>
    </section>
  )
}

function StoryTimeline() {
  const moments = [
    {
      icon: BookOpen,
      title: 'La librairie',
      text: 'Un endroit où on passe de beaux moments.',
    },
    {
      icon: Users,
      title: 'L’équipe',
      text: 'On travaille ensemble chaque jour.',
    },
    {
      icon: Sparkles,
      title: 'L’anniversaire',
      text: 'Aujourd’hui, on fête Si Chbile.',
    },
  ]

  return (
    <section className="py-28 px-4 bg-[#f7faf8] relative overflow-hidden">
      <motion.div
        className="absolute -right-32 top-20 w-72 h-72 rounded-full bg-[#3d7a66]/8 blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#0f2a24] mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Notre histoire
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#3d7a66] mb-16 max-w-lg mx-auto"
        >
          Quelques chapitres de Si Chbile — écrits côte à côte.
        </motion.p>

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: easeOut }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#c9a227] via-[#3d7a66] to-[#c9a227] origin-top md:-translate-x-1/2"
          />

          <div className="space-y-14">
            {moments.map((m, i) => {
              const Icon = m.icon
              const left = i % 2 === 0
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: left ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: easeOut }}
                  className={`relative flex md:items-center gap-6 ${
                    left ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    className={`flex-1 pl-16 md:pl-0 ${
                      left ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="inline-block backdrop-blur-sm bg-white/60 border border-[#1a4a3c]/8 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow">
                      <h3
                        className="text-2xl font-semibold text-[#1a4a3c] mb-1"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {m.title}
                      </h3>
                      <p className="text-[#0f2a24]/70 leading-relaxed text-sm md:text-base">
                        {m.text}
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.25, rotate: 15 }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(201,162,39,0)',
                        '0 0 0 12px rgba(201,162,39,0.12)',
                        '0 0 0 0 rgba(201,162,39,0)',
                      ],
                    }}
                    transition={{ duration: 2.8, delay: i * 0.25, repeat: Infinity }}
                    className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#1a4a3c] to-[#0f2a24] text-[#f0e6c8] flex items-center justify-center shadow-xl z-10"
                  >
                    <Icon size={20} />
                  </motion.div>
                  <div className="hidden md:block flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function MerciCard() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-28 px-4 bg-gradient-to-b from-[#f7faf8] to-[#e8f2ee] relative overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#c9a227]/20"
          style={{ left: `${4 + i * 8}%`, top: `${10 + (i % 5) * 16}%` }}
          animate={{
            y: [0, -28, 0],
            rotate: [0, 200, 360],
            opacity: [0.1, 0.45, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 4.5 + i * 0.2, delay: i * 0.15, repeat: Infinity }}
        >
          <Star size={12 + (i % 4) * 5} fill="currentColor" />
        </motion.div>
      ))}

      <div className="container mx-auto max-w-xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#0f2a24]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Une surprise pour toi
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#3d7a66] mb-14"
        >
          Clique sur la carte.
        </motion.p>
        <div className="flex justify-center min-h-80 perspective-card">
          <motion.button
            type="button"
            onClick={() => setOpen(!open)}
            className="relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] rounded-2xl"
            animate={{
              rotateY: open ? 180 : 0,
              y: open ? 0 : [0, -10, 0],
            }}
            transition={{
              rotateY: { duration: 0.85, ease: easeOut },
              y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              transformStyle: 'preserve-3d',
              width: '300px',
              height: '340px',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={open}
          >
            <AnimatePresence>
              {open &&
                [...Array(10)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-[#c9a227] pointer-events-none"
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{
                      opacity: 0,
                      x: Math.cos((i / 10) * Math.PI * 2) * 90,
                      y: Math.sin((i / 10) * Math.PI * 2) * 90,
                      scale: 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                ))}
            </AnimatePresence>

            <div
              className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center bg-gradient-to-br from-[#3d7a66] via-[#1a4a3c] to-[#0f2a24] shadow-[0_25px_60px_rgba(15,42,36,0.35)]"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/10" />
              <motion.div
                animate={{ scale: [1, 1.14, 1], rotate: [0, 6, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="relative"
              >
                <BookOpen size={60} className="text-white mb-4 drop-shadow-lg" />
              </motion.div>
              <p className="relative text-white font-semibold text-xl tracking-wide">
                Merci à toi
              </p>
              <p className="relative text-white/65 text-xs mt-2 tracking-widest uppercase">
                Touche pour ouvrir
              </p>
            </div>
            <div
              className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center bg-gradient-to-br from-[#f0e6c8] via-[#f7faf8] to-[#e8f2ee] shadow-[0_25px_60px_rgba(15,42,36,0.2)]"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 18, -18, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                <Sparkles size={42} className="text-[#c9a227] mb-3" />
              </motion.div>
              <p
                className="text-[#0f2a24] font-semibold text-2xl mb-3 text-center"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Joyeux anniversaire
              </p>
              <p className="text-[#1a4a3c]/80 text-sm text-center leading-relaxed">
                Merci Si Chbile. Pour la confiance, la passion
                et chaque journée qu’on partage au travail.
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

function CelebrationBurst() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = ['Joyeux', 'anniversaire', 'Si', 'Chbile', '✦']

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 bg-[#0f2a24] overflow-hidden noise-overlay"
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(201,162,39,0.3), transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(61,122,102,0.35), transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(201,162,39,0.3), transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      {inView &&
        [...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#c9a227]"
            style={{ left: '50%', top: '50%' }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: 0,
              scale: 0,
              x: Math.cos((i / 16) * Math.PI * 2) * (120 + (i % 4) * 40),
              y: Math.sin((i / 16) * Math.PI * 2) * (80 + (i % 3) * 30),
            }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.03 }}
          />
        ))}
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-8">
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              initial={{ opacity: 0, y: 60, rotate: -15, scale: 0.8 }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                      rotate: 0,
                      scale: [1, 1.1, 1],
                    }
                  : {}
              }
              transition={{
                delay: i * 0.12,
                duration: 0.65,
                ease: easeOut,
                scale: { delay: 1.1 + i * 0.1, duration: 2.2, repeat: Infinity },
              }}
              className={`text-4xl md:text-6xl font-bold ${
                w === '✦' ? 'text-[#c9a227]' : 'text-[#f0e6c8]'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {w}
            </motion.span>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-[#e8f2ee]/70 text-base md:text-lg tracking-wide"
        >
          Avec tout le cœur.
        </motion.p>
      </div>
    </section>
  )
}

function QuoteMarquee() {
  const quotes = [
    '« Travailler ensemble, c’est écrire la même histoire. »',
    '« Joyeux anniversaire, Si Chbile ! »',
  ]
  const loop = [...quotes, ...quotes]

  return (
    <section className="py-5 bg-[#1a4a3c] overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/60 to-transparent" />
      <motion.div
        className="flex whitespace-nowrap py-8"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((q, i) => (
          <span
            key={i}
            className="mx-8 text-[#f0e6c8] text-lg md:text-xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {q}
            <motion.span
              className="mx-8 inline-block text-[#c9a227]"
              animate={{ rotate: [0, 180, 360], scale: [1, 1.4, 1] }}
              transition={{ duration: 3.5, delay: i * 0.15, repeat: Infinity }}
            >
              ✦
            </motion.span>
          </span>
        ))}
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-16 px-4 gradient-deep text-[#f7faf8] overflow-hidden noise-overlay"
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 16, repeat: Infinity }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 40%, rgba(201,162,39,0.4), transparent 40%)',
          backgroundSize: '200% 200%',
        }}
      />
      <div className="container mx-auto text-center relative z-10">
        <motion.p
          className="text-4xl md:text-5xl mb-4 text-gradient-gold"
          style={{ fontFamily: 'var(--font-display)', WebkitTextFillColor: 'unset' }}
          animate={{ letterSpacing: ['0.02em', '0.1em', '0.02em'] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="text-[#f0e6c8]">Si Chbile</span>
        </motion.p>
        <p className="text-[#e8f2ee]/70 mb-8 max-w-md mx-auto text-sm md:text-base leading-relaxed">
          Joyeux anniversaire.
        </p>
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="inline-flex"
        >
          <Library size={30} className="text-[#c9a227] drop-shadow-[0_0_12px_rgba(201,162,39,0.5)]" />
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <FloatingPages />
      <FallingConfetti />
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <BookShelf />
        <StoryTimeline />
        <MerciCard />
        <CelebrationBurst />
        <QuoteMarquee />
        <Footer />
      </div>
    </main>
  )
}
