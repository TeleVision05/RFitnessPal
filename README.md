# RFitnessPal
**Inspiration**
We noticed a lot of food being wasted at Glasgow and Lothian, often because people took more than they needed. This usually happened due to poor planning or not knowing what was being served. To address this, we created an app to help users plan their meals ahead of time based on the daily menu, reducing unnecessary waste. We also included allergen and ingredients data for users to make sure their needs are met.

**What it does**
The program extracts data publicly available at the Glasgow and Lothian menu sites to get the calorie and nutrition data that is buried in the sites. It allows users to create and customize plates, sort through allergen or preferences and returns total calorie count along with other macros.

**How we built it**
We created a backend for scrapnig data from online dining menus and storing the data and a frontend for retrieving and processing the data from the backend. We used a simple UI and a backend with only 2 data endpoints.

**Challenges we ran into**
We had a lot of hurdles moving from a familiar language in C++ which all of our classes were in to java which many of us haven't used in a few years. We were also unable to host it online due to the free hosting sites limitations.

**Accomplishments that we're proud of**
The website data scraping and subsequent parsing of the information into what we need and do not need is something we are very proud of.

**What we learned**
Converting C++ code to JavaScript and the beginnings of how to use Emscripten to convert C++ code into JS code that can be called and used in the program. We also learned that there are certain limitations to web scraping.

**What's next for R'Fitness Pal**
Figuring out hosting, polishing up the UI/UX, translating our algorithms and machine learning in C++ to JavaScript to create prescribed automatic menus using macro nutrient goal data and user feedback on popular items.
