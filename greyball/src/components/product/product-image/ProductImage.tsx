'use client'
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
  width: number;
  height: number;
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width,
  height
}: Props) => {

  const localSrc = (src)
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg';

  const [isLoading, setIsLoading] = useState(true)

  const onloadCallBack = (e: any) => {
    setIsLoading(false)
    typeof onload === 'function'
  }

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={clsx(className , 'ease-in-out animation duration-500', isLoading ? 'opacity-0' : 'opacity-100')}
      style={style}
      onLoad={onloadCallBack}
    />
  );
};
