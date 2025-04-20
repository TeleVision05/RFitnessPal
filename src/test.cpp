#include <string>
#include <sstream>
#include <emscripten.h>

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    const char* processArgs(int argc, const char* argv[]) {
        static std::string result; // this persists across calls
        std::ostringstream oss;
        oss << "Received " << argc << " arguments:\n";
        for (int i = 0; i < argc; ++i) {
            oss << "Arg " << i << ": " << argv[i] << "\n";
        }
        result = oss.str();
        return result.c_str();
    }
}
