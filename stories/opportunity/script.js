/* Opportunity — mission stops. Facts adapted from NASA mission records. */
window.STORY = {
    bg: 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA18079.jpg',
    missionMeta: {
        spacecraft: 'Mars Exploration Rover – B (Opportunity)',
        planet: 'Mars (Meridiani Planum)',
        coordinates: '1.95° S, 354.47° E',
        mass: '185 kg (408 lbs)',
        status: 'Inactive — Resting in Perseverance Valley, Mars',
        sourceUrl: 'https://science.nasa.gov/mission/mer-opportunity/',
    },
    
    gallery: [
        {
            src: 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA18079.jpg',
            alt: "Self-portrait of NASA's Opportunity rover on Mars",
            caption: 'Opportunity self-portrait on Mars. Image: NASA/JPL-Caltech',
        },
        {
            src: 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA16120.jpg',
            alt: "Opportunity's long afternoon shadow stretching into Endeavour Crater",
            caption: "Opportunity's shadow at Endeavour Crater, 2012. Image: NASA/JPL-Caltech",
        },
        {
            src: 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA14534.jpg',
            alt: 'View across Endeavour Crater from the rim, with large rocks in the foreground',
            caption: 'View across Endeavour Crater, 2011. Image: NASA/JPL-Caltech/Cornell/ASU',
        },
        {
            src: 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA13081.jpg',
            alt: 'The distant rim of Endeavour Crater on the Martian horizon',
            caption: 'Endeavour Crater on the horizon, 2010. Image: NASA/JPL-Caltech/Cornell University',
        },
        {
            src: 'https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA14538.jpg',
            alt: 'Mosaic of Botany Bay and the Endeavour Crater rim',
            caption: "Botany Bay and Endeavour's rim, 2011. Image: NASA/JPL-Caltech",
        },
    ],

    stops: [
        {
            title: 'Launch: Twin Explorers',
            date: 'July 7, 2003',
            text: 'Opportunity blasted off from Cape Canaveral, Florida, aboard a Delta II rocket, folded tightly inside a protective aeroshell and lander. After a 456-million-kilometer (283-million-mile) journey through deep space lasting nearly seven months, it arrived at the Red Planet right behind its twin rover, Spirit.',
            fact: 'Its name came from a NASA student essay contest. Nine-year-old Sofi Collis from Arizona suggested both "Spirit" and "Opportunity" to represent hope and exploration.',
        },
        {
            title: 'Landing: A Cosmic "Hole in One"',
            date: 'January 25, 2004',
            text: 'Protected by a heat shield, a supersonic parachute, and giant bouncing airbags, Opportunity hit the Martian surface and rolled to a gentle stop inside Eagle Crater on a flat plain called Meridiani Planum. Its six wheels unfolded, and its solar panels opened like wings to catch the Martian sunlight.',
            fact: 'Scientists called the landing an interplanetary "hole in one" because Eagle Crater is only 22 meters (72 feet) wide, placing ancient rock layers right in front of the rover.',
        },
        {
            title: 'Signs of Ancient Water',
            date: 'March 2004',
            text: 'Using its Rock Abrasion Tool and Microscopic Imager, Opportunity examined bedrock inside Eagle Crater and discovered tiny iron-rich mineral spheres nicknamed "blueberries" alongside salty sulfate rocks. Together, they proved that liquid water once soaked this region of Mars.',
            fact: 'This major scientific discovery happened within Opportunity’s first two months on Mars—long before its original 90-sol (Martian day) mission was scheduled to end.',
        },
        {
            title: 'Craters and a Martian Meteorite',
            date: '2004 – 2008',
            text: 'Opportunity drove out of Eagle Crater to explore Endurance Crater and later the massive Victoria Crater, studying rock layers like pages in a history book. Along the plains in January 2005, it stumbled upon "Heat Shield Rock"—a basketball-sized iron-nickel meteorite sitting right next to its own discarded heat shield.',
            fact: 'Heat Shield Rock was the very first meteorite ever discovered on the surface of another planet, and Victoria Crater stretched about 800 meters wide—roughly eight football fields across.',
        },
        {
            title: 'Endeavour Crater & Clay Minerals',
            date: 'August 2011',
            text: 'After a three-year trek across rugged sand ripples, Opportunity reached the rim of Endeavour Crater, a 22-kilometer-wide impact basin. There it discovered clay minerals and a bright white vein of gypsum named "Homestake," proving that gentler, neutral-pH water once flowed here—conditions far friendlier to ancient microbial life.',
            fact: 'Gypsum veins form when mineral-rich water flows through underground cracks in rock and leaves crystals behind over time.',
        },
        {
            title: 'A Marathon on Another World',
            date: 'March 24, 2015',
            text: 'On Sol 3,968, Opportunity officially completed the distance of an Olympic marathon—42.195 kilometers (26.219 miles)—on the surface of Mars. Powered entirely by sunlight and equipped with robotic science tools on its mechanical arm, the golf-cart-sized rover kept climbing slopes and analyzing rocks for years afterward.',
            fact: 'Opportunity’s top speed was only about 5 centimeters (2 inches) per second, yet by the end of its journey it set an off-Earth driving record of 45.16 kilometers (28.06 miles).',
        },
        {
            title: 'The Planet-Wide Dust Storm & Legacy',
            date: 'June 10, 2018 – February 13, 2019',
            text: 'In June 2018, a colossal dust storm wrapped around Mars, turning day into pitch-black night and starving Opportunity’s solar panels of power. It transmitted its final telemetry signal on June 10, 2018. After sending more than 1,000 recovery commands over eight months, NASA declared the mission complete on February 13, 2019.',
            fact: 'Designed to last just 90 Martian days, Opportunity survived for 5,111 sols—nearly 15 Earth years—and remains preserved on the rim of Perseverance Valley as a silent monument to human curiosity.',
        },
    ],
};
