import React, { useEffect, useRef, useState } from 'react';

const SALE_TARGET = new Date('2026-07-01T00:00:00+05:30').getTime();
const pad = (n) => String(n).padStart(2, '0');

const getTimeLeft = () => {
    const diff = SALE_TARGET - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
};

/* ── Slot digit ── */
const SlotDigit = ({ value, fs, tileW, tileH }) => {
    const [cur, setCur] = useState(value);
    const [nxt, setNxt] = useState(value);
    const [go, setGo]   = useState(false);

    useEffect(() => {
        if (value === cur) return;
        setNxt(value); setGo(true);
        const t = setTimeout(() => { setCur(value); setGo(false); }, 300);
        return () => clearTimeout(t);
    }, [value]);

    const base = {
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontWeight: 900, color: '#fff',
        fontVariantNumeric: 'tabular-nums', fontSize: fs,
    };
    return (
        <div style={{ position: 'relative', overflow: 'hidden', width: tileW, height: tileH }}>
            <span style={{ ...base, transform: go ? 'translateY(-115%)' : 'translateY(0)', opacity: go ? 0 : 1, transition: go ? 'transform .3s cubic-bezier(.4,0,.2,1),opacity .28s' : 'none' }}>{cur}</span>
            <span style={{ ...base, transform: go ? 'translateY(0)' : 'translateY(115%)', opacity: go ? 1 : 0, transition: go ? 'transform .3s cubic-bezier(.4,0,.2,1),opacity .28s' : 'none' }}>{nxt}</span>
        </div>
    );
};

/* ── Luxury countdown unit ── */
const CountUnit = ({ value, label, pulse, fs = '2rem', tileW = '2.2rem', tileH = '3.2rem' }) => {
    const digits = pad(value).split('');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem' }}>
            {/* Two-digit block */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
                {digits.map((d, i) => (
                    <div key={i} style={{
                        position: 'relative', borderRadius: '0.5rem', overflow: 'hidden',
                        width: tileW, height: tileH,
                        background: 'linear-gradient(170deg, rgba(10,3,30,.96) 0%, rgba(30,8,68,.97) 100%)',
                        boxShadow: pulse
                            ? '0 0 0 1.5px rgba(251,191,36,.5), 0 6px 20px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.1)'
                            : '0 0 0 1px rgba(255,255,255,.12), 0 6px 20px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.1)',
                    }}>
                        <SlotDigit value={d} fs={fs} tileW={tileW} tileH={tileH} />
                        {/* Crease line */}
                        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,.65)', zIndex: 3 }} />
                        {/* Top shine */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', pointerEvents: 'none', zIndex: 2, background: 'linear-gradient(180deg,rgba(255,255,255,.09) 0%,transparent 100%)' }} />
                    </div>
                ))}
            </div>
            {/* Label with gold line above */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <div style={{ width: '1.5rem', height: '1px', background: pulse ? 'rgba(251,191,36,.6)' : 'rgba(196,181,253,.35)' }} />
                <span style={{
                    fontSize: '0.48rem', fontWeight: 800, textTransform: 'uppercase',
                    letterSpacing: '0.22em',
                    color: pulse ? 'rgba(253,211,77,.9)' : 'rgba(196,181,253,.65)',
                }}>{label}</span>
            </div>
        </div>
    );
};

/* ── Blinking dot colon ── */
const Colon = ({ tick }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.8rem', opacity: tick ? 1 : 0.15, transition: 'opacity .15s' }}>
        {[0, 1].map(i => <div key={i} style={{ width: '0.38rem', height: '0.38rem', borderRadius: '50%', background: 'rgba(196,181,253,.7)', boxShadow: '0 0 7px rgba(167,139,250,.6)' }} />)}
    </div>
);

/* ── Thin gold rule ── */
const GoldRule = ({ vertical }) => (
    <div style={vertical
        ? { width: '1px', alignSelf: 'stretch', margin: '1.2rem 0', background: 'linear-gradient(180deg,transparent,rgba(251,191,36,.3) 35%,rgba(251,191,36,.3) 65%,transparent)' }
        : { height: '1px', width: '100%', background: 'linear-gradient(90deg,transparent,rgba(251,191,36,.4) 40%,rgba(251,191,36,.4) 60%,transparent)' }
    } />
);

/* ════════════════════════════ MAIN ════════════════════════════ */
const SalesBanner = () => {
    const [time, setTime]       = useState(getTimeLeft());
    const [tick, setTick]       = useState(true);
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const loop = () => { setTime(getTimeLeft()); setTick(p => !p); timerRef.current = setTimeout(loop, 1000); };
        loop();
        return () => clearTimeout(timerRef.current);
    }, []);

    useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

    const entry = (delay, axis = 'Y', px = 18) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : `translate${axis}(${px}px)`,
        transition: `opacity .65s ${delay}s ease, transform .65s ${delay}s cubic-bezier(.22,1,.36,1)`,
    });

    return (
        <div className="w-full relative overflow-hidden select-none"
            style={{
                transform: visible ? 'translateY(0)' : 'translateY(-100%)',
                opacity:   visible ? 1 : 0,
                transition: 'transform .55s cubic-bezier(.22,1,.36,1), opacity .45s ease',
            }}>

            {/* ══ BACKGROUND ══ */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(108deg,#1e0845 0%,#4c1d95 28%,#1e40af 52%,#86198f 76%,#4c1d95 100%)' }} />
            {/* Mesh */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
            {/* Shimmer sweep */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(112deg,transparent 15%,rgba(255,255,255,.09) 50%,transparent 85%)', backgroundSize: '250% 100%', animation: 'bSweep 6s ease-in-out infinite' }} />
            {/* Left/right radial glows */}
            <div className="absolute inset-y-0 left-0 w-2/5 pointer-events-none" style={{ background: 'radial-gradient(ellipse at left center,rgba(29,78,216,.45) 0%,transparent 70%)' }} />
            <div className="absolute inset-y-0 right-0 w-2/5 pointer-events-none" style={{ background: 'radial-gradient(ellipse at right center,rgba(134,25,143,.4) 0%,transparent 70%)' }} />
            {/* Top gold line */}
            <div className="absolute top-0 inset-x-0 pointer-events-none" style={{ height: '3px', background: 'linear-gradient(90deg,transparent,#fbbf24 18%,#fde68a 50%,#fbbf24 82%,transparent)' }} />
            {/* Bottom line */}
            <div className="absolute bottom-0 inset-x-0 pointer-events-none" style={{ height: '2px', background: 'linear-gradient(90deg,transparent,rgba(240,114,255,.65) 25%,rgba(240,114,255,.65) 75%,transparent)' }} />

            {/* ══ DESKTOP ══ */}
            <div className="hidden md:grid w-full px-8 lg:px-14" style={{ height: '190px', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '2rem' }}>

                {/* ── LEFT: Identity ── */}
                <div className="flex flex-col justify-center gap-1" style={entry(0.12, 'X', -22)}>
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2.5">
                        <div style={{ width: '2rem', height: '1px', background: 'rgba(251,191,36,.5)' }} />
                        <span style={{ fontSize: '0.45rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.35em', color: 'rgba(253,230,138,.7)' }}>Exclusive Offer · Summer 2026</span>
                        <div style={{ width: '2rem', height: '1px', background: 'rgba(251,191,36,.5)' }} />
                    </div>

                    {/* Main headline — two lines */}
                    <div style={{ lineHeight: 1.05 }}>
                        <div style={{ fontSize: 'clamp(1.4rem,3vw,2.1rem)', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,.55)', fontStyle: 'italic' }}>
                            Great
                        </div>
                        <div style={{
                            fontSize: 'clamp(1.8rem,3.8vw,2.8rem)', fontWeight: 900, textTransform: 'uppercase',
                            letterSpacing: '0.04em', lineHeight: 1,
                            background: 'linear-gradient(90deg,#fde68a 0%,#fbbf24 22%,#fde68a 45%,#f9a8d4 68%,#fde68a 100%)',
                            backgroundSize: '280% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text', animation: 'gFlow 4s linear infinite',
                            filter: 'drop-shadow(0 2px 12px rgba(251,191,36,.22))',
                        }}>Summer Sale</div>
                    </div>

                    {/* Bottom rule + sub */}
                    <GoldRule />
                    <span style={{ fontSize: '0.46rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(196,181,253,.6)', marginTop: '0.15rem' }}>
                        ✦ &nbsp;Premium Cooling · Best Prices · Free Shipping&nbsp; ✦
                    </span>
                </div>

                {/* ── CENTER: Countdown ── */}
                <div className="flex flex-col items-center justify-center gap-2" style={entry(0.26)}>
                    {/* Label */}
                    <div className="flex items-center gap-2">
                        <div style={{ width: '1.2rem', height: '1px', background: 'rgba(196,181,253,.35)' }} />
                        <span style={{ fontSize: '0.44rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.32em', color: 'rgba(196,181,253,.6)' }}>Starts In</span>
                        <div style={{ width: '1.2rem', height: '1px', background: 'rgba(196,181,253,.35)' }} />
                    </div>

                    {/* Digit row */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.2rem' }}>
                        <CountUnit value={time.days}    label="Days"  />
                        <Colon tick={tick} />
                        <CountUnit value={time.hours}   label="Hours" />
                        <Colon tick={tick} />
                        <CountUnit value={time.minutes} label="Mins"  />
                        <Colon tick={tick} />
                        <CountUnit value={time.seconds} label="Secs"  pulse />
                    </div>
                </div>

                {/* ── RIGHT: CTA + badge ── */}
                <div className="flex flex-col items-end justify-center gap-3" style={entry(0.38, 'X', 22)}>
                    {/* Off badge */}
                    <div style={{
                        display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                        padding: '0.4rem 1rem', borderRadius: '0.6rem',
                        background: 'linear-gradient(135deg,rgba(251,191,36,.18) 0%,rgba(251,191,36,.08) 100%)',
                        border: '1px solid rgba(251,191,36,.3)', backdropFilter: 'blur(8px)',
                    }}>
                        <span style={{ fontSize: '0.43rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(253,230,138,.75)' }}>Up to</span>
                        <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24', lineHeight: 1, letterSpacing: '-0.02em' }}>40% OFF</span>
                        <span style={{ fontSize: '0.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(253,230,138,.55)' }}>On All ACs</span>
                    </div>

                    {/* CTA */}
                    <a href="/products" style={{ textDecoration: 'none' }}>
                        <div className="group" style={{
                            display: 'flex', alignItems: 'center', gap: '0.55rem',
                            padding: '0.7rem 1.8rem', borderRadius: '0.65rem',
                            background: 'linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%)',
                            color: '#1c1917', fontWeight: 900, textTransform: 'uppercase',
                            fontSize: '0.75rem', letterSpacing: '0.14em',
                            boxShadow: '0 0 0 1px rgba(251,191,36,.4), 0 8px 28px rgba(251,191,36,.4)',
                            cursor: 'pointer', transition: 'transform .2s, box-shadow .2s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(251,191,36,.4),0 10px 36px rgba(251,191,36,.55)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 0 1px rgba(251,191,36,.4),0 8px 28px rgba(251,191,36,.4)'; }}
                        >
                            Shop the Sale
                            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>

            {/* ══ MOBILE ══ */}
            <div className="flex md:hidden flex-col items-center py-3.5 gap-2.5 px-4"
                style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-10px)', transition: 'opacity .5s .1s, transform .5s .1s cubic-bezier(.22,1,.36,1)' }}>
                {/* Title */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem' }}>
                    <span style={{ fontSize: '0.42rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(253,230,138,.6)' }}>Exclusive Offer</span>
                    <span style={{
                        fontSize: 'clamp(.9rem,5vw,1.2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em',
                        background: 'linear-gradient(90deg,#fde68a,#fbbf24 30%,#f9a8d4 65%,#fde68a)',
                        backgroundSize: '300% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text', animation: 'gFlow 4s linear infinite',
                    }}>Great Summer Sale</span>
                </div>
                {/* Countdown compact */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.8rem' }}>
                    <CountUnit value={time.days}    label="Days" fs="1.1rem" tileW="1.5rem" tileH="2.1rem" />
                    <Colon tick={tick} />
                    <CountUnit value={time.hours}   label="Hrs"  fs="1.1rem" tileW="1.5rem" tileH="2.1rem" />
                    <Colon tick={tick} />
                    <CountUnit value={time.minutes} label="Min"  fs="1.1rem" tileW="1.5rem" tileH="2.1rem" />
                    <Colon tick={tick} />
                    <CountUnit value={time.seconds} label="Sec"  fs="1.1rem" tileW="1.5rem" tileH="2.1rem" pulse />
                </div>
                <a href="/products" style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1.2rem', borderRadius: '0.5rem',
                    background: 'linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%)', color: '#1c1917',
                    fontWeight: 900, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em',
                    boxShadow: '0 4px 16px rgba(251,191,36,.35)', textDecoration: 'none',
                }}>Shop Now →</a>
            </div>

            <style>{`
                @keyframes bSweep { 0%{background-position:-100% 0} 55%{background-position:200% 0} 100%{background-position:200% 0} }
                @keyframes gFlow  { 0%{background-position:0% center} 100%{background-position:280% center} }
            `}</style>
        </div>
    );
};

export default SalesBanner;
