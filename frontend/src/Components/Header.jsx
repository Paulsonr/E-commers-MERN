import { memo } from "react";


const Header = memo(
  ({ notifications, avatar, showLoginSection }) => {
    return (
      <header className="self-stretch bg-white flex flex-col items-center justify-start py-3.5 px-20 top-[0] z-[99] sticky text-left text-sm text-black font-archivo border-b-[1px] border-solid border-light-grey-border mq750:pl-10 mq750:pr-10 mq750:box-border">
        <div className="w-full flex flex-row items-center justify-between max-w-[1280px] gap-[20px] mq1275:max-w-full">
          <img
            className="h-[40.5px] w-[156.8px] relative"
            loading="lazy"
            alt=""
            src="/assets/logo.svg"
          />
          <div className="flex flex-row items-start justify-start gap-[30px] mq750:hidden">
            <div className="relative inline-block min-w-[39px]">Home</div>
            <div className="relative inline-block min-w-[36px]">Stays</div>
            <div className="relative inline-block min-w-[94px] whitespace-nowrap">
              Become a host
            </div>
          </div>
          {showLoginSection && (
            <div className="h-9 flex flex-row items-center justify-start gap-[20px]">
              <img
                className="h-[26.5px] w-[26px] relative object-cover"
                loading="lazy"
                alt=""
                src={notifications}
              />
              <img
                className="h-9 w-9 relative rounded-[50%] object-cover"
                loading="lazy"
                alt=""
                src={avatar}
              />
            </div>
          )}
        </div>
      </header>
    );
  }
);

export default Header;
