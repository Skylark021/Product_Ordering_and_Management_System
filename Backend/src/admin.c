#include <stdio.h>
#include <string.h>
#include "admin.h"

void admin_login(void) {
    // Very simple static login
    const char *username = "admin";
    const char *password = "password";

    // Just demo output
    printf("<h2>Admin Login</h2>");
    printf("<p>Username: %s</p>", username);
    printf("<p>Password: %s</p>", password);
    printf("<p>(Authentication logic can be added here)</p>");
}
