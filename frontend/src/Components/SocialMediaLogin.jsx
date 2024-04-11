import { memo } from "react";

const SocialMediaLogin = memo(
  ({ orSignUpWith, image, image1, image2 }) => {
    return (
      <div className="self-stretch flex flex-col items-start justify-start gap-[10px] text-left text-base text-dark font-archivo">
        <div className="self-stretch relative tracking-[0.02em] leading-[26px]">
          {orSignUpWith}
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-1 pl-0 gap-[14px_12px] text-center text-light-text">
          <div className="h-[125.5px] flex-1 rounded-lg bg-whitesmoke-100 flex flex-col items-center justify-start py-[25px] pr-[13px] pl-[13.099999999999907px] box-border gap-[18px] min-w-[125px]">
            <img
              className="w-10 h-[40.5px] relative object-cover"
              loading="lazy"
              alt=""
              src={image}
            />
            <div className="self-stretch relative tracking-[0.24px]">
              Google
            </div>
          </div>
          <div className="h-[125.5px] flex-[0.5663] rounded-lg bg-whitesmoke-100 flex flex-col items-center justify-start py-[25px] px-[41px] box-border gap-[18px] min-w-[125px]">
            <img
              className="w-10 h-[40.5px] relative object-cover"
              alt=""
              src={image1}
            />
            <div className="self-stretch relative tracking-[0.24px] inline-block min-w-[73px]">
              Facebook
            </div>
          </div>
          <div className="h-[125.5px] flex-1 rounded-lg bg-whitesmoke-100 flex flex-col items-center justify-start py-[25px] pr-[13px] pl-[13.099999999999907px] box-border gap-[18px] min-w-[125px]">
            <img
              className="w-10 h-[40.5px] relative object-cover"
              alt=""
              src={image2}
            />
            <div className="self-stretch relative tracking-[0.24px]">Apple</div>
          </div>
        </div>
      </div>
    );
  }
);

export default SocialMediaLogin;
