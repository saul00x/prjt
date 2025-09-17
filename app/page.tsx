@@ .. @@
-import { HoodieCard } from "@/components/hoodie-card"
+import { AccountCard } from "@/components/account-card"
 import { AutoSliderBanner } from "@/components/auto-slider-banner"
+import { useEffect, useState } from "react"

 export default function Home() {
-  const hoodies = [
+  const [accounts, setAccounts] = useState([])
+
+  useEffect(() => {
+    // Fetch accounts from Django API
+    fetch('http://localhost:8000/api/accounts/')
+      .then(res => res.json())
+      .then(data => setAccounts(data))
+      .catch(err => console.error(err))
+  }, [])
+
+  // Fallback data for development
+  const fallbackAccounts = [
     {
       id: 1,
-      name: "SDFM Classic Black",
+      name: "Premium FIFA Account",
       price: 149.99,
-      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
-      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
+      image1: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
+      image2: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
+      detailImage: "https://images.pexels.com/photos/159204/game-controller-joystick-joypad-gamepad-159204.jpeg"
     },
     {
       id: 2,
-      name: "SDFM Premium Gray",
+      name: "Elite Gaming Account",
       price: 154.99,
-      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
-      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
+      image1: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
+      image2: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
+      detailImage: "https://images.pexels.com/photos/159204/game-controller-joystick-joypad-gamepad-159204.jpeg"
     },
     {
       id: 3,
-      name: "SDFM Signature Navy",
+      name: "Pro Player Account",
       price: 159.99,
-      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
-      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
+      image1: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
+      image2: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
+      detailImage: "https://images.pexels.com/photos/159204/game-controller-joystick-joypad-gamepad-159204.jpeg"
     },
     {
       id: 4,
-      name: "SDFM Limited Edition",
+      name: "Ultimate Gaming Package",
       price: 199.99,
-      image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
-      image2: "https://i.pinimg.com/736x/94/d3/14/94d31436dfc73fcf93058089f69ffd96.jpg",
+      image1: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
+      image2: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
+      detailImage: "https://images.pexels.com/photos/159204/game-controller-joystick-joypad-gamepad-159204.jpeg"
     },
   ]

+  const displayAccounts = accounts.length > 0 ? accounts : fallbackAccounts
+
   return (
     <main className="flex min-h-screen flex-col items-center justify-between">
       {/* Full-screen Auto-sliding Banner */}
@@ .. @@
       {/* Product Section */}
       <section id="product-section" className="w-full py-12 md:py-24 bg-dark-900">
         <div className="container mx-auto px-4">
-          <h2 className="mb-8 text-3xl font-bold text-center text-gray-100">Latest Collection</h2>
+          <h2 className="mb-8 text-3xl font-bold text-center text-gray-100">Latest Accounts</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
-            {hoodies.map((hoodie) => (
-              <HoodieCard key={hoodie.id} {...hoodie} />
+            {displayAccounts.map((account) => (
+              <AccountCard key={account.id} {...account} />
             ))}
           </div>
         </div>
@@ .. @@
   )
 }