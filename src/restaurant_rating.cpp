#include <string>
#include <cstring>

extern "C" {
    const char* getRestaurantInfo(const char* arg) {
        std::string restaurant(arg);
        std::string response;

        if (restaurant == "glasgow") {
            response = "Glasgow is awful!";
        } else if (restaurant == "lothian") {
            response = "Lothian is great!";
        } else {
            response = "Unknown restaurant";
        }

        // Return a static buffer (make sure it's persistent!)
        static std::string result;
        result = response;
        return result.c_str();
    }
}
