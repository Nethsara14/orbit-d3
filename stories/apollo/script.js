/* Apollo 11: Eagle — mission stops. Facts adapted from NASA mission records. */
window.STORY = {
    bg: 'https://images-assets.nasa.gov/image/as11-44-6642/as11-44-6642~large.jpg',
    missionMeta: {
        spacecraft: 'Apollo 11 Lunar Module "Eagle"',
        planet: 'The Moon (Sea of Tranquility)',
        coordinates: '0.67° N, 23.47° E',
        status: 'Descent stage still resting at Tranquility Base, the Moon',
        sourceUrl: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11.html',
    },

    gallery: [
        {
            src: 'https://www.nasa.gov/wp-content/uploads/2023/03/589552main_as11-40-5875_full.jpg',
            alt: 'Astronaut Buzz Aldrin standing beside the American flag on the Moon, with the Eagle lunar module at left',
            caption: 'Buzz Aldrin beside the flag at Tranquility Base, 1969. Image: NASA',
        },
        {
            src: 'https://images-assets.nasa.gov/image/as11-44-6642/as11-44-6642~large.jpg',
            alt: 'The Eagle ascent stage returning to lunar orbit, with Earth rising above the Moon',
            caption: 'Eagle returning to lunar orbit, July 21, 1969. Image: NASA/Michael Collins',
        },
        {
            src: 'https://images-assets.nasa.gov/image/KSC-69PC-397/KSC-69PC-397~orig.jpg',
            alt: 'The American flag at Kennedy Space Center as the Apollo 11 Saturn V lifts off',
            caption: 'Apollo 11 lifts off from Kennedy Space Center, July 16, 1969. Image: NASA',
        },
        {
            src: 'https://images-assets.nasa.gov/image/as11-40-5903/as11-40-5903~large.jpg',
            alt: 'Buzz Aldrin on the Moon with Neil Armstrong and the lunar module reflected in his visor',
            caption: 'Aldrin’s visor reflects Armstrong and Eagle, 1969. Image: NASA/Neil Armstrong',
        },
        {
            src: 'https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~large.jpg',
            alt: 'The Apollo 11 lunar module Eagle resting on the lunar surface',
            caption: 'Eagle resting on the lunar surface, 1969. Image: NASA',
        },
    ],

    stops: [
        {
            title: 'Launch: Journey to the Moon',
            date: 'July 16, 1969',
            text: 'Apollo 11 lifted off from Launch Complex 39A at Kennedy Space Center, Florida, on a Saturn V rocket at 9:32 a.m. EDT. On board were commander Neil Armstrong, command module pilot Michael Collins and lunar module pilot Buzz Aldrin. The lander Eagle rode folded up inside the rocket below their command module.',
            fact: 'The Saturn V stood about 363 feet (111 meters) tall, taller than the Statue of Liberty without its base.',
        },
        {
            title: 'Into Lunar Orbit',
            date: 'July 19 – 20, 1969',
            text: 'After a four-day trip, Apollo 11 entered orbit around the Moon on July 19. On July 20, Armstrong and Aldrin climbed into the lunar module Eagle and separated from the command module Columbia at 1:47 p.m. EDT, while Collins stayed behind in orbit.',
            fact: 'Eagle was named after the bald eagle on the Apollo 11 mission patch, which shows an eagle landing with an olive branch.',
        },
        {
            title: 'The Eagle Has Landed',
            date: 'July 20, 1969',
            text: 'Computer alarms sounded during the descent, and the planned landing area was covered with boulders. Armstrong took manual control and flew Eagle to a safe spot in the Sea of Tranquility at about 4:17 p.m. EDT, with only seconds of fuel left. He radioed Mission Control that "the Eagle has landed."',
            fact: 'Eagle’s descent stage did two jobs: it landed the crew on the Moon, and later it served as the launch platform for the ascent stage.',
        },
        {
            title: 'One Small Step',
            date: 'July 20, 1969',
            text: 'At 10:56 p.m. EDT, Neil Armstrong climbed down the ladder and became the first person to step onto the Moon. Buzz Aldrin joined him about 20 minutes later. Together they walked on the surface for about two and a half hours while a TV camera sent the pictures back to Earth.',
            fact: 'An estimated 600 million people around the world watched the first moonwalk live on television.',
        },
        {
            title: 'Science at Tranquility Base',
            date: 'July 20 – 21, 1969',
            text: 'Next to Eagle, the astronauts set up experiments, including a seismometer to detect moonquakes and a laser reflector. They also planted the U.S. flag and collected rock and soil samples to bring back to Earth, about 21.5 kg (47.5 lb) in total.',
            fact: 'The laser reflector left by Apollo 11 is still used today. Scientists bounce laser beams off it to measure the distance between Earth and the Moon.',
        },
        {
            title: 'Leaving Eagle Behind',
            date: 'July 21, 1969',
            text: 'After 21 and a half hours on the surface, the ascent stage of Eagle blasted off from the Moon at about 1:54 p.m. EDT, leaving the descent stage behind. It docked with Columbia at 5:34 p.m. EDT. Once the crew and their samples moved over, the ascent stage was cast off into lunar orbit.',
            fact: 'To save weight, the astronauts left behind items such as their boots and life-support backpacks. A plaque on the descent stage says they came in peace for all mankind.',
        },
        {
            title: 'Splashdown & Legacy',
            date: 'July 24, 1969',
            text: 'Columbia splashed down in the Pacific Ocean and the crew was picked up by the recovery ship USS Hornet. Eagle’s descent stage remained on the Moon, where it still sits at Tranquility Base today. NASA’s Lunar Reconnaissance Orbiter later photographed the site from above.',
            fact: 'The Eagle ascent stage left in lunar orbit slowly lost its orbit over time, and it is believed to have crashed on the Moon at an unknown location.',
        },
    ],
};
