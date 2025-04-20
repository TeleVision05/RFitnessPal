#include <iostream>

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Please provide a restaurant name as an argument" << std::endl;
        return 1;
    }

    std::string restaurant = argv[2]; // Get the restaurant argument
    std::cout << restaurant << std::endl;
    if (restaurant == "glasgow") {
        std::cout << "Glasgow is awful!" << std::endl;
    } else if (restaurant == "lothian") {
        std::cout << "Lothian is great!" << std::endl;
    } else {
        std::cout << "Unknown restaurant" << std::endl;
    }

    return 0;
}