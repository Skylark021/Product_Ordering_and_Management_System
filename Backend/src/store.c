#include "store.h"
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <string.h>
#include <errno.h>

#ifdef _WIN32
    #include <direct.h>
    #define MKDIR(path) _mkdir(path)
#else
    #define MKDIR(path) mkdir(path, 0777)
#endif

void ensure_data_dir(void) {
    struct stat st = {0};
    if (stat(DATA_DIR, &st) == -1) {
        if (MKDIR(DATA_DIR) != 0) {
            fprintf(stderr, "Error: Could not create data directory '%s' (errno=%d)\n",
                    DATA_DIR, errno);
            exit(1);
        }
    }
}