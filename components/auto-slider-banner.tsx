@@ .. @@
 import { Button } from "@/components/ui/button"

-const images = [
-  "https://64.media.tumblr.com/db8472cfbb89a155148003b053d5f3de/4d6d987e0cee7307-8e/s400x225/158142e8e876044a6191733a02f6ee5ac1643b58.gif",
-  "https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif",
-]
+const videoUrl = "https://www.pexels.com/fr-fr/download/video/32410100/"

 export function AutoSliderBanner() {
-  const [currentIndex, setCurrentIndex] = useState(0)
-
-  useEffect(() => {
-    const interval = setInterval(() => {
-      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
-    }, 5000) // Change image every 5 seconds
-
-    return () => clearInterval(interval)
-  }, [])
-
   const handleShopClick = () => {
     const productSection = document.getElementById("product-section")
     if (productSection) {
@@ .. @@

   return (
     <div className="relative w-full h-screen overflow-hidden">
-      {images.map((src, index) => (
-        <div
-          key={src}
-          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
-            index === currentIndex ? "opacity-100" : "opacity-0"
-          }`}
-        >
-          <Image
-            src={src || "/placeholder.svg"}
-            alt={`Banner ${index + 1}`}
-            fill
-            style={{ objectFit: "cover" }}
-            priority
-          />
-        </div>
-      ))}
+      <video
+        autoPlay
+        muted
+        loop
+        className="absolute top-0 left-0 w-full h-full object-cover"
+      >
+        <source src="https://videos.pexels.com/video-files/32410100/12736088_1920_1080_30fps.mp4" type="video/mp4" />
+      </video>
       <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
-        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-100 text-center mb-4">
-          Premium Streetwear
+        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-100 text-center mb-4 font-mono">
+          Bergomi Store
         </h1>
-        <p className="text-xl text-gray-300 text-center mb-8">Elevate Your Style</p>
+        <p className="text-xl text-gray-300 text-center mb-8">Own the Game</p>
         <Button onClick={handleShopClick} size="lg" variant="outline">
           SHOP
         </Button>
@@ .. @@
   )
 }