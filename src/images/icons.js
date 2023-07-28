import React from "react";

export function BriefcaseIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <path
        fill={color}
        d="M106 112a6 6 0 0 1 6-6h32a6 6 0 0 1 0 12h-32a6 6 0 0 1-6-6Zm124-40v128a14 14 0 0 1-14 14H40a14 14 0 0 1-14-14V72a14 14 0 0 1 14-14h42V48a22 22 0 0 1 22-22h48a22 22 0 0 1 22 22v10h42a14 14 0 0 1 14 14ZM94 58h68V48a10 10 0 0 0-10-10h-48a10 10 0 0 0-10 10ZM38 72v42.79A186 186 0 0 0 128 138a185.91 185.91 0 0 0 90-23.22V72a2 2 0 0 0-2-2H40a2 2 0 0 0-2 2Zm180 128v-71.63A198.12 198.12 0 0 1 128 150a198.05 198.05 0 0 1-90-21.62V200a2 2 0 0 0 2 2h176a2 2 0 0 0 2-2Z"
      />
    </svg>
  );
}

export function CircleIcon({
  size = 40, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      width={size} // added size here
      height={size} // added size here
    >
      <circle fill={color} cx={size / 2} cy={size / 2} r={size / 2.5} />
    </svg>
  );
}

export function EducationIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <g clip-path="url(#clip0_3433_3688)">
        <path
          fill={color}
          d="M3.33 8L10 12L20 6L10 0L0 6H10V8H3.33ZM0 8V16L2 13.78V9.2L0 8ZM10 20L5 17L3 15.8V9.8L10 14L17 9.8V15.8L10 20Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_3433_3688">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function FamilyIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <path
        fill={color}
        d="M9.5 7.5a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 9.5 7.5zM14.27 4h-2.54A1.73 1.73 0 0 0 10 5.73V9a1 1 0 0 0 1 1v6h4v-6a1 1 0 0 0 1-1V5.73A1.73 1.73 0 0 0 14.27 4z"
      />
      <path
        fill={color}
        d="M15 2a2 2 0 1 1-3.999.001A2 2 0 0 1 15 2zM4.27 5H1.73a1.73 1.73 0 1 0 .001 3.461A1.73 1.73 0 0 0 1.73 5A1.73 1.73 0 0 0 0 6.73V9a1 1 0 0 0 1 1l-1 3h1v3h4v-3h1l-1-3a1 1 0 0 0 1-1V6.73A1.73 1.73 0 0 0 4.27 5z"
      />
      <path
        fill={color}
        d="M5 3a2 2 0 1 1-3.999.001A2 2 0 0 1 5 3zm2 10v3h2v-3a1 1 0 0 0 1-1v-1.54A1.46 1.46 0 0 0 8.54 9H7.46A1.46 1.46 0 0 0 6 10.46V12a1 1 0 0 0 1 1z"
      />
    </svg>
  );
}

export function HeartIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <path
        fill={color}
        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"
      />
    </svg>
  );
}

export function HealthIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <path
        fill={color}
        d="M7 22V17H2V13H8.45L10.15 15.575H11.95L13.3 11.25L14.45 13H22V17H17V22H7ZM10.7 12.75L9.525 11H2V7H7V2H17V7H22V11H15.525L13.825 8.45H12.05L10.7 12.75Z"
      />
    </svg>
  );
}

export function MoneyIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <path
        fill={color}
        d="M9.5 7.5a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 9.5 7.5zM14.27 4h-2.54A1.73 1.73 0 0 0 10 5.73V9a1 1 0 0 0 1 1v6h4v-6a1 1 0 0 0 1-1V5.73A1.73 1.73 0 0 0 14.27 4z"
      />
      <path
        fill={color}
        d="M15 2a2 2 0 1 1-3.999.001A2 2 0 0 1 15 2zM4.27 5H1.73a1.73 1.73 0 1 0 .001 3.461A1.73 1.73 0 0 0 1.73 5A1.73 1.73 0 0 0 0 6.73V9a1 1 0 0 0 1 1l-1 3h1v3h4v-3h1l-1-3a1 1 0 0 0 1-1V6.73A1.73 1.73 0 0 0 4.27 5z"
      />
      <path
        fill={color}
        d="M5 3a2 2 0 1 1-3.999.001A2 2 0 0 1 5 3zm2 10v3h2v-3a1 1 0 0 0 1-1v-1.54A1.46 1.46 0 0 0 8.54 9H7.46A1.46 1.46 0 0 0 6 10.46V12a1 1 0 0 0 1 1z"
      />
    </svg>
  );
}

export function PassionIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <mask id="ipTPersonalCollection0">
        <g
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
        >
          <circle cx="24" cy="11" r="7" fill="#555" />
          <path d="M4 41c0-8.837 8.059-16 18-16" />
          <path
            fill="#555"
            d="M31.85 28C29.724 28 28 30.009 28 32.486c0 4.487 4.55 8.565 7 9.514c2.45-.949 7-5.027 7-9.514C42 30.01 40.276 28 38.15 28c-1.302 0-2.453.753-3.15 1.906C34.303 28.753 33.152 28 31.85 28Z"
          />
        </g>
      </mask>
      <path
        fill={color}
        d="M0 0h48v48H0z"
        mask="url(#ipTPersonalCollection0)"
      />
    </svg>
  );
}

export function PersonalIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <mask id="ipTPersonalCollection0">
        <g
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
        >
          <circle cx="24" cy="11" r="7" fill="#555" />
          <path d="M4 41c0-8.837 8.059-16 18-16" />
          <path
            fill="#555"
            d="M31.85 28C29.724 28 28 30.009 28 32.486c0 4.487 4.55 8.565 7 9.514c2.45-.949 7-5.027 7-9.514C42 30.01 40.276 28 38.15 28c-1.302 0-2.453.753-3.15 1.906C34.303 28.753 33.152 28 31.85 28Z"
          />
        </g>
      </mask>
      <path
        fill={color}
        d="M0 0h48v48H0z"
        mask="url(#ipTPersonalCollection0)"
      />
    </svg>
  );
}

export function SocialIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <path
        fill={color}
        d="M17.4746 1.83398C18.3056 1.83398 19.0468 2.67807 19.0468 3.81189C19.0468 4.94977 18.3056 5.7898 17.4746 5.7898C16.6435 5.7898 15.9023 4.94977 15.9023 3.81189C15.9023 2.67807 16.6435 1.83398 17.4746 1.83398ZM11.5044 1.83398C12.331 1.83398 13.0767 2.67807 13.0767 3.81189C13.0767 4.94977 12.331 5.7898 11.5044 5.7898C10.6734 5.7898 9.92768 4.94977 9.92768 3.81189C9.92768 2.67807 10.6734 1.83398 11.5044 1.83398ZM5.52982 1.83398C6.36088 1.83398 7.10209 2.67807 7.10209 3.81189C7.10209 4.94977 6.36088 5.7898 5.52982 5.7898C4.69877 5.7898 3.95352 4.94977 3.95352 3.81189C3.95352 2.67807 4.69877 1.83398 5.52982 1.83398ZM11.5044 6.73316C14.3794 6.82301 16.8052 6.82301 19.7162 6.92184C21.1042 7.72145 21.7466 11.8183 21.7062 13.2423L20.9156 14.0375C20.5697 12.1148 20.1339 9.54977 19.4107 8.97926V12.9144L19.5949 21.1666H18.5976L17.8474 12.8695H17.0388L16.2886 21.1666H15.2869L15.4755 12.9144L15.1162 8.93883H13.7999L13.4765 12.9009L13.6652 21.1531H12.6634L11.9087 12.856H11.1001L10.3454 21.1531H9.34818L9.53685 12.9009L9.20893 8.93883H7.89271L7.53334 12.9144L7.72201 21.1666H6.72025L5.97006 12.8695H5.16146L4.40273 21.1666H3.40547L3.59414 12.9144V8.97926C2.86641 9.54977 2.43066 12.1148 2.08477 14.0375L1.29414 13.2423C1.25371 11.8183 1.90059 7.72145 3.28418 6.92184C6.20365 6.82301 8.62943 6.82301 11.5044 6.73316Z"
      />
    </svg>
  );
}

export function SpiritualityIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <g clip-path="url(#clip0_3433_3666)">
        <path
          fill={color}
          d="M14.1667 2.75C14.1667 2.02065 13.8682 1.32118 13.3368 0.805456C12.8054 0.289731 12.0848 0 11.3333 0C10.5819 0 9.86122 0.289731 9.32986 0.805456C8.79851 1.32118 8.5 2.02065 8.5 2.75C8.5 3.47935 8.79851 4.17882 9.32986 4.69454C9.86122 5.21027 10.5819 5.5 11.3333 5.5C12.0848 5.5 12.8054 5.21027 13.3368 4.69454C13.8682 4.17882 14.1667 3.47935 14.1667 2.75ZM8.88516 11.3438L9.89896 12.6973C10.1867 13.0797 10.6206 13.3289 11.1031 13.3891C11.5857 13.4492 12.0727 13.316 12.449 13.0152L16.3448 9.92148C17.1018 9.31992 17.2125 8.23711 16.5927 7.50234C15.9729 6.76758 14.8573 6.66016 14.1003 7.26172L11.6565 9.20391L10.4966 7.65703C9.81042 6.7332 8.70365 6.1875 7.52604 6.1875C6.15807 6.1875 4.90521 6.92227 4.26771 8.09531L2.11615 12.0699C1.22187 13.7242 1.7 15.7609 3.24948 16.8738L5.60469 18.5625H1.77083C0.792448 18.5625 0 19.3316 0 20.2812C0 21.2309 0.792448 22 1.77083 22H10.9792C11.7451 22 12.4224 21.523 12.6615 20.8184C12.9005 20.1137 12.6482 19.3402 12.0328 18.8977L6.89297 15.2109L8.88516 11.3438Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_3433_3666">
          <rect width="17" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function VolunteerIcon({
  size = 24, // or any default size of your choice
  color = "black", // or any color of your choice
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size} // added size here
      height={size} // added size here
      fill={color} // added color here
    >
      <path
        fill={color}
        d="M12.75 3.94c1-.72 2.16-1.08 3.47-1.08c.72 0 1.51.19 2.37.59c.86.39 1.54.85 2.04 1.38c1.03 1.28 1.46 2.77 1.31 4.47c-.16 1.7-.72 3.03-1.69 3.97l-7.59 7.59c-.19.19-.43.28-.71.28c-.28 0-.51-.09-.7-.28a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.71l4.59-4.59c.25-.22.25-.45 0-.7c-.25-.25-.48-.25-.7 0l-4.59 4.59a.95.95 0 0 1-.71.28c-.28 0-.51-.09-.7-.28a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.71l4.59-4.59c.27-.25.27-.5 0-.75c-.23-.25-.45-.25-.7 0l-4.59 4.64a.98.98 0 0 1-.71.28c-.28 0-.52-.09-.73-.28c-.2-.19-.3-.42-.3-.7c0-.28.11-.53.33-.75l4.6-4.6c.25-.25.25-.48 0-.7c-.25-.22-.49-.22-.71 0L6.28 14.5c-.22.2-.45.31-.7.31c-.28 0-.52-.1-.7-.31c-.19-.2-.29-.44-.29-.72c0-.28.1-.51.29-.7C7.94 10 9.83 8.14 10.55 7.45l3.56 3.52c.39.37.84.56 1.39.56c.7 0 1.25-.28 1.66-.84c.28-.41.38-.86.3-1.36c-.08-.5-.29-.92-.63-1.27l-4.08-4.12m2.06 6.33L10.55 6l-7.08 7.08c-.84-.85-1.32-2.15-1.43-3.92c-.11-1.76.37-3.29 1.43-4.57c1.19-1.18 2.61-1.78 4.26-1.78c1.66 0 3.07.6 4.22 1.78l4.27 4.27c.19.19.28.42.28.7c0 .28-.09.52-.28.71c-.19.18-.42.28-.72.28c-.27 0-.5-.1-.69-.28Z"
      />
    </svg>
  );
}
