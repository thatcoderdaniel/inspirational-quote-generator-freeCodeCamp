import dynamic from 'next/dynamic'
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
  loading: () => <div style={{ width: '250px', height: '250px' }} />
});

export const ImageBlobCon = styled.div`
    position: relative;
    text-align: center;
    top: 10px;
    margin-top: 20px;
    transition: 0.3s all ease-in-out;
    width: fit-content;
    margin: auto;
    height: 100px;
    z-index: 99999;
    &:hover {
        transform: scale(4.8);
        z-index: 99999;
        transition: 0.3s ease-in-out;
        box-shadow: 0 0 80px 90px rgba(0,0,0,0.6);
    }
`;
