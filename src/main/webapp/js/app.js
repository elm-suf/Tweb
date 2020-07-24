//++++++++++++++++++++++++MODULE++++++++++++++++++++++++++++++++++++++++++++++++++//
var studente = angular.module("studente", ['ngRoute', 'ngMaterial']);
var amministratore = angular.module("amministratore", ['ngRoute', 'ngMaterial']);

studente.config(['$routeProvider', '$locationProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'homepage.html'
            })
            .when('/profilo', {
                templateUrl: '../profilo.html',
                controller: 'profilo_ctrl'
            })
            .when('/cerca', {
                templateUrl: 'cerca-materia.html',
                controller: 'cercaMateriaCtrl'
            })
            .when('/tabella', {
                templateUrl: 'tabella.html',
                controller: 'tabellaCtrl'
            })
            .when('/login', {
                templateUrl: 'html/login-register.html'
            })
            .otherwise({redirectTo: '/'});
    }]);

amministratore.config(['$routeProvider', '$locationProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'dashboard.html'
            })
            .when('/profilo', {
                templateUrl: '../profilo.html',
                controller: 'profilo_ctrl'
            })
            .when('/studenti', {
                templateUrl: 'studenti.html',
                controller: 'studenti_ctrl'
            })
            .when('/corsi', {
                templateUrl: 'corsi.html',
                controller: 'corsi_ctrl'
            })
            .when('/docenti', {
                templateUrl: 'docenti.html',
                controller: 'docenti_ctrl'
            })
            .when('/insegnamenti', {
                templateUrl: 'insegnamenti.html',
                controller: 'insegnamenti_ctrl'
            })
            .when('/prenotazioni', {
                templateUrl: 'prenotazioni.html',
                controller: 'prenotazioni_ctrl'
            })
            .when('/inserisci_studente', {
                templateUrl: 'inserisci_studente.html'
            })
            .when('/inserisci_corso', {
                templateUrl: 'inserisci_corso.html'
            })
            .when('/inserisci_docente', {
                templateUrl: 'inserisci_docente.html'
            })
            .when('/inserisci_insegnamento', {
                templateUrl: 'inserisci_insegnamento.html'
            })
            .when('/inserisci_prenotazione', {
                templateUrl: 'inserisci_prenotazione.html'
            })
            .when('/login', {
                templateUrl: 'views/login-register.html'
            })
            .otherwise({redirectTo: '/'});
    }]);

studente.controller("tabellaCtrl", tabellaCtrl);
studente.controller("cercaMateriaCtrl", cercaMateriaCtrl);
studente.controller("profilo_ctrl", profilo_ctrl);
studente.controller("prenotaCtrl", prenotaCtrl);
studente.controller("main", main);

amministratore.controller('dashboard_ctrl', dashboard_ctrl);
amministratore.controller('studenti_ctrl', studenti_ctrl);
amministratore.controller('docenti_ctrl', docenti_ctrl);
amministratore.controller('corsi_ctrl', corsi_ctrl);
amministratore.controller('prenotazioni_ctrl', prenotazioni_ctrl);
amministratore.controller('insegnamenti_ctrl', insegnamenti_ctrl);
amministratore.controller("profilo_ctrl", profilo_ctrl);
amministratore.controller("main", main);

function main($scope, $http) {

    $scope.logout = function () {

        console.log("logout");

        $http({
            method: 'POST',
            url: '/controller',
            params: {
                action: 'logout'
            },
            headers: {
                'Cache-Control': 'must-revalidate, no-cache, no-store'
            }
        }).then(function (value) {
            location.replace("/html/login-register.html");
            console.log("value = " + value);
        })

    }
}

function tabellaCtrl($scope, $http) {
    $http({
        method: 'get',
        url: '/controller',
        params: {
            action: 'lista-prenotazioni'
            // studente: 'studente'// todo prendere username da session object
        }
    }).then(function (response) {
        console.log(response.data);
        $scope.fakeData = response.data;
    }, function (reason) {
        console.log(reason);
        location.replace("/html/login-register.html");
    });

    $scope.delete = function (prenotazione) {
        console.log("elimina prenotazione : " + prenotazione.data);
        console.log("elimina fakedata =  : " + $scope.fakeData);
        // if (confirm("sei sicuro?")) {
        mscConfirm("Delete?", "Sicuro sicuro?", function () {
            var bool = deleteEntry(prenotazione, $http);
            if (bool) {
                var index = $scope.fakeData.indexOf(prenotazione);
                if (index > -1) {
                    $scope.fakeData[index].stato = 'disdetta';
                }
                alert("Deleted")
            } else {
                prompt("couldn't delete");
            }
        });

    };

    function deleteEntry(prenotazione, $http) {
        $http({
            method: 'get',
            url: '/controller',
            params: {
                action: 'disdisci',
                docente: prenotazione.docente,
                data: prenotazione.data,
                slot: prenotazione.slot,
                studente: 'studente'  //todo SESSIONE
            }
        }).then(function (response) {
            console.log(response.data);
        }, function (reason) {
            console.log("++++++Reason+++++++  " + reason);
            return false;
        });
        return true;
    }
}


function cercaMateriaCtrl($scope, $http) {

    //essenzialmente aggiorno il valore di elenco su cui faccio li
    $scope.getInsegnanti = function () {
        console.log("fammi vedere gli insegnanti che insegnano " + $scope.inputcorso);

        $http({
            method: 'GET',
            url: '/controller',
            params: {
                'action': 'insegnamenti',
                'subject': $scope.inputcorso
            }
        }).then(function (response) {
            $scope.elenco = response.data;
            //console.log(response.data);
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });
    };
}

function prenotaCtrl($scope, $http) {

    $scope.mostraDisponibilita = function (docente) {
        console.log("mostro disponibilita input ");
        console.log($scope.inputdata);

        var date = $scope.inputdata.getFullYear() + '-' + ($scope.inputdata.getMonth() + 1) + '-' + $scope.inputdata.getDate();
        console.log('date = ' + date);

        $http({
            method: 'GET',
            url: '/controller',
            params: {
                'action': 'disponibilita',
                'docente': docente.username,
                'data': date
            }
        }).then(function (response) {
            // $scope.elenco = response.data;
            console.log(response.data);
            $scope.disponibili = response.data;
            console.log('scope' + $scope.disponibili);
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });


    };

    $scope.effettuaPrenotazione = function (slot) {
        console.log(slot);
        console.log($scope.inputcorso);

        var date = $scope.inputdata.getFullYear() + '-' + ($scope.inputdata.getMonth() + 1) + '-' + $scope.inputdata.getDate();

        $http({
            method: 'post',
            url: '/controller',
            params: {
                'action': 'prenotazione',
                'slot': slot,
                'docente': $scope.docente.username,  //todo-done sistemare qui
                'corso': $scope.inputcorso,      //todo sistema qui
                'data': date,
                'stato': 'attiva'
            }
        }).then(function (response) {
            console.log(response);
            console.log("splice " + $scope.disponibili.indexOf(slot));
            $scope.disponibili.splice($scope.disponibili.indexOf(slot),1);
        }, function (reason) {
            console.log("~~~~~~~~~~~~~~~~");
            console.log(reason);
            location.replace("/html/login-register.html");
        });
    };
}

function studenti_ctrl($scope, $http, $mdDialog) {
    $http.get("/controller", {params: {'action': 'elenco_studenti'}})
        .then(function (response) {
            console.log(response.data);
            $scope.tabella = response.data;
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });

    $scope.elimina = function (x, ev) {
        var confirm = $mdDialog.confirm()
            .title('Sei sicuro?')
            .targetEvent(ev)
            .ok('OK!')
            .cancel('Chiudi');

        $mdDialog.show(confirm).then(function () {
            $http({
                method: 'GET',
                url: "/controller",
                params: {
                    'action': 'remove_studente',
                    'username': x.username
                }
            }).then(function () {
                $http({
                    method: 'GET',
                    url: "/controller",
                    params: {
                        'action': 'elenco_studenti'
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.tabella = response.data;
                })
            });
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });
    };

}

function docenti_ctrl($scope, $http, $mdDialog) {
    $http.get("/controller", {params: {'action': 'elenco_docenti'}})
        .then(function (response) {
            console.log(response.data);
            $scope.tabella = response.data;
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });

    $scope.elimina = function (x, ev) {
        var confirm = $mdDialog.confirm()
            .title('Sei sicuro?')
            .targetEvent(ev)
            .ok('OK!')
            .cancel('Chiudi');

        $mdDialog.show(confirm).then(function () {
            $http({
                method: 'GET',
                url: "/controller",
                params: {
                    'action': 'remove_docente',
                    'username': x.username
                }
            }).then(function () {
                $http({
                    method: 'GET',
                    url: "/controller",
                    params: {
                        'action': 'elenco_docenti'
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.tabella = response.data;
                })
            });
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });
    };
}

function corsi_ctrl($scope, $http, $mdDialog) {
    $http.get("/controller", {params: {'action': 'elenco_corsi'}})
        .then(function (response) {
            console.log(response.data);
            $scope.tabella = response.data;
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });

    $scope.elimina = function (x, ev) {
        var confirm = $mdDialog.confirm()
            .title('Sei sicuro?')
            .targetEvent(ev)
            .ok('OK!')
            .cancel('Chiudi');

        $mdDialog.show(confirm).then(function () {
            $http({
                method: 'GET',
                url: "/controller",
                params: {
                    'action': 'remove_corso',
                    'titolo': x.titolo
                }
            }).then(function () {
                $http({
                    method: 'GET',
                    url: "/controller",
                    params: {
                        'action': 'elenco_corsi'
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.tabella = response.data;
                })
            });
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });
    }
}

function prenotazioni_ctrl($scope, $http, $mdDialog) {
    $http.get("/controller", {params: {'action': 'elenco_prenotazioni'}})
        .then(function (response) {
            console.log(response.data);
            $scope.tabella = response.data;
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });

    $scope.elimina = function (x, ev) {
        var confirm = $mdDialog.confirm()
            .title('Sei sicuro?')
            .targetEvent(ev)
            .ok('OK!')
            .cancel('Chiudi');

        $mdDialog.show(confirm).then(function () {
            $http({
                method: 'GET',
                url: "/controller",
                params: {
                    'action': 'remove_prenotazione',
                    'stato': x.stato,
                    'studente': x.studente,
                    'docente': x.docente,
                    'corso': x.corso,
                    'slot': x.slot,
                    'data': x.data
                }
            }).then(function () {
                $http({
                    method: 'GET',
                    url: "/controller",
                    params: {
                        'action': 'elenco_prenotazioni'
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.tabella = response.data;
                })
            });
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });
    }
}

function insegnamenti_ctrl($scope, $http, $mdDialog) {
    $http.get("/controller", {params: {'action': 'elenco_insegnamenti'}})
        .then(function (response) {
            console.log(response.data);
            $scope.tabella = response.data;
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });

    $scope.elimina = function (x, ev) {
        var confirm = $mdDialog.confirm()
            .title('Sei sicuro?')
            .targetEvent(ev)
            .ok('OK!')
            .cancel('Chiudi');

        $mdDialog.show(confirm).then(function () {
            $http({
                method: 'GET',
                url: "/controller",
                params: {
                    'action': 'remove_insegnamento',
                    'corso': x.corso,
                    'docente': x.docente
                }
            }).then(function () {
                $http({
                    method: 'GET',
                    url: "/controller",
                    params: {
                        'action': 'elenco_insegnamenti'
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.tabella = response.data;
                })
            });
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });
    }
}

function profilo_ctrl($scope, $http){
    $http.get("/controller", {params: {'action': 'profilo'}})
        .then(function (response) {
            console.log(response.data);
            $scope.us_profilo = response.data["username"];
            $scope.pas_profilo = response.data["password"];
            $scope.nome_profilo = response.data["nome"];
            $scope.cogn_profilo = response.data["cognome"];
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });
}

function dashboard_ctrl($scope, $http){
    $http.get("/controller", {params: {'action': 'statistiche'}})
        .then(function (response) {
            console.log(response.data);
            $scope.n_studenti = response.data[0];
            $scope.n_docenti = response.data[1];
            $scope.n_insegnamenti = response.data[2];
            $scope.n_corsi = response.data[3];
            $scope.n_prenotazioni = response.data[4];
        }, function (reason) {
            console.log(reason);
            location.replace("/html/login-register.html");
        });
}