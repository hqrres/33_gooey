import Image from 'next/image';

export default function Home_2() {

    return (
      <div className="home_2">
        <div className="flex flex-wrap my-10">
            <div className="h-300px flex-1">

            </div>
            <div className="bg-green-500 h-300px flex-1 relative">
              <Image 
                src="/img/img_2.jpg" 
                alt="section_2" 
                layout="fill" 
                objectFit="cover" 
                objectPosition="center"
                className="w-full h-full"
              />
            </div>
        </div>
      </div>
    );
  }
  
  
  
  
  
  