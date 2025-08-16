import React from "react";

export default function Loader() {
    return (
        <div className="h-full w-full flex items-center justify-center ">
            <div className="relative flex justify-center items-center z-10 before:content-[''] before:bg-white/10 before:backdrop-blur-md before:absolute before:w-[140px] before:h-[55px] before:z-0 before:rounded-b-[10px] before:border before:border-t-0 before:border-white/30 before:shadow-[0_15px_20px_rgba(0,0,0,0.08)] before:animate-[anim2_2s_infinite]">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        style={{ "--i": i }}
                        className="bg-gray-200 rounded-full w-[25px] h-[25px] z-20 animate-[anim_2s_infinite_linear] m-[0.2em]"
                    ></div>
                ))}
            </div>

            <style>{`
        @keyframes anim {
          0%, 100% { transform: translateY(5px); }
          50% { transform: translateY(-65px); }
        }
        @keyframes anim2 {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        .animate-[anim_2s_infinite_linear] {
          animation-delay: calc(-0.3s * var(--i));
          transform: translateY(5px);
        }
      `}</style>
        </div>
    );
}
