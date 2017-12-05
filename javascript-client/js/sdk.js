const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },
    Course: {

        findAll: (cb) => {
            SDK.request({
                method: "GET",
                url: "/courses"

            }, (err, data) => {
              if (err) return cb(err);

              data = JSON.parse(data);

              cb(null, data);
            });
        },

    },
    Author: {
        findAll: (cb) => {
            SDK.request({method: "GET", url: "/authors"}, cb);
        }
    },
    Order: {
        create: (data, cb) => {
            SDK.request({
                method: "POST",
                url: "/orders",
                data: data,
                headers: {authorization: SDK.Storage.load("tokenId")}
            }, cb);
        },
        findMine: (cb) => {
            SDK.request({
                method: "GET",
                url: "/orders/" + SDK.User.current().id + "/allorders",
                headers: {
                    authorization: SDK.Storage.load("tokenId")
                }
            }, cb);
        }
    },
    User: {
        create: (newUsername, newPassword, firstName, lastName, cb) => {
            SDK.request({
                method: "POST",
                url: "/user",
                data: {
                    username: newUsername,
                    password: newPassword,
                    firstName: firstName,
                    lastName: lastName,
                    type: 1

                },

            }, (err, data) => {
                if (err) return cb(err);

                cb(null, data);

            });
        },
        createAdmin: (newUsername, newPassword, firstName, lastName, cb) => {
            SDK.request({
                method: "POST",
                url: "/user",
                data: {
                    username: newUsername,
                    password: newPassword,
                    firstName: firstName,
                    lastName: lastName,
                    type: 2

                },

            }, (err, data) => {
                if (err) return cb(err);

                cb(null, data);

            });
        },

        findAll: (cb) => {
            SDK.request({
                    method: "GET",
                url: "/user"},
                cb);
        },
        current: () => {
            return SDK.Storage.load("user");
        },
        logOut: () => {
            SDK.Storage.remove("tokenId");
            SDK.Storage.remove("userId");
            SDK.Storage.remove("user");
            window.location.href = "login.html";
        },
        login: (username, password, cb) => {
            SDK.request({
                url: "/user/login",
                method: "POST",
                data: {
                    username: username,
                    password: password
                }
            }, (err, data) => {
                //On login-error
                if (err) return cb(err);

                data = JSON.parse(data);
                SDK.Storage.persist("type", data.type);
                SDK.Storage.persist("user", data.firstName);

                cb(null, data);

            });

        },
        delete: (id, cb) => {
            SDK.request({
                    method: "DELETE",
                    url: "/user/" + id,
                },
                (err) => {
                    if (err) return cb(err);

                    cb(null);
                });
        },
        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const currentUser = SDK.User.current();
                if (currentUser) {
                    $(".navbar-right").html(`
                  <li><a href="login.html" id="logout-link">Logout</a></li>
                `);
                } else {
                    $(".navbar-right").html(`
             f     <li><a href="login.html">Log-in <span class="sr-only">(current)</span></a></li>
                `);
                }
                $("#logout-link").click(() => SDK.User.logOut());
                cb && cb();
            });

        },
    },
        Storage: {
            prefix: "DOEK Quiz",
            persist: (key, value) => {
                window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
            },
            load: (key) => {
                const val = window.localStorage.getItem(SDK.Storage.prefix + key);
                try {
                    return JSON.parse(val);
                }
                catch (e) {
                    return val;
                }
            },
            remove: (key) => {
                window.localStorage.removeItem(SDK.Storage.prefix + key);
            }
        },
    quiz: {

        findAll: (id, cb) => {
            SDK.request({
                method: "GET",
                url: ("/quiz/" + id),

            }, (err, data) => {
                if (err) return cb(err);

                data = JSON.parse(data);

                cb(null, data);
            });

        }
    }

};

