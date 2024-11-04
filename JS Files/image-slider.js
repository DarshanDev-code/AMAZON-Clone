const slides = document.querySelectorAll('.slide');
        let i=0;
        let num=0;

        setInterval(()=>{
            num = num - (slides.length+1);
            if(num<0 && num>-slides.length)
                {
            Sliding();
                }
            else{  
                    num=num + 7;
                    Sliding();
                }
        },3000)

        function Sliding()
        {
            for(i =0;i<slides.length;i++)
            {
                    slides[i].style.transform = `TranslateX(${num*100}%)`;
                    num++
                }
        }  

        function Next()
        {
            num = num - (slides.length+1);
            if(num<0 && num>-slides.length)
                {
            Sliding();}
            else{
                    
                    num=num + 1;
                    Sliding();
                }
        }
        
        function Prev()
        {
            num = num - (slides.length-1);
            if(num<1 && num>-slides.length)
                {
            
            Sliding();
            }
            else{
                    num=num-1
                    Sliding();
            }
        }