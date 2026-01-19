import { useState, useEffect, ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

/**
 * OptimizedImage component with lazy loading, fade-in effect, and modern format hints.
 * For critical above-the-fold images, set priority={true} to disable lazy loading.
 */
const OptimizedImage = ({
  src,
  alt,
  sizes,
  priority = false,
  placeholder = "empty",
  blurDataURL,
  className = "",
  style,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Generate srcSet for responsive images (if the src is a local asset)
  const isLocalAsset = src.startsWith("/") || src.startsWith("data:") || src.includes("/assets/");

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* Blur placeholder */}
      {placeholder === "blur" && blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
          style={{ filter: "blur(20px)", transform: "scale(1.1)" }}
        />
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${hasError ? "hidden" : ""}`}
        {...props}
      />

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 text-muted-foreground text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
