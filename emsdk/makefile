EMCC = emcc
CXXFLAGS = -O3
TARGET = ../src/program.js
SOURCES = ../src/restaurant_rating.cpp

EM_FLAGS = \
  -s MODULARIZE=1 \
  -s EXPORT_NAME='createMyModule' \
  -s ENVIRONMENT='web,worker' \
  -s EXPORTED_FUNCTIONS='["_main"]' \
  -s EXPORTED_RUNTIME_METHODS='["callMain", "ccall", "cwrap", "UTF8ToString"]' \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s WASM=1 \
  -s SINGLE_FILE=1 \
  -s EXPORT_ES6=1

all: $(TARGET)

$(TARGET): $(SOURCES)
	@mkdir -p src
	$(EMCC) $(CXXFLAGS) $^ -o $@ $(EM_FLAGS)

clean:
	rm -f $(TARGET)