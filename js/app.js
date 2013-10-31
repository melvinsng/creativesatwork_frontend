'use strict';
var resolvables;

resolvables = {};
angular.module('config', []);

angular.module('common', ['ui.route', 'config', 'ngMobile', 'ngCookies', 'restangular', 'ui.bootstrap', 'ui.select2']);

angular.module('account', []);

angular.module('dashboard', []);

angular.module('pages', []);

angular.module('platform', []);

angular.module('app', ['config', 'common', 'dashboard', 'account', 'pages', 'platform']);

angular.element(document).ready(function() {
  return angular.bootstrap(document, ['app']);
});
angular.module('account').config([
  '$routeProvider', 'WardenProvider', function($routeProvider, WardenProvider) {
    return WardenProvider.simplify($routeProvider).set_template_prefix('views/account').when('freelancer.login').when('freelancer.login.custom_provider').when('freelancer.register').when('freelancer.register.custom_provider').when('employer.login').when('employer.login.custom_provider').when('employer.register').when('employer.register.custom_provider').when('account.email_confirmation/:userId/:token', {
      omitView: true
    }).when('account.reset_password/:userId/:token');
  }
]);
angular.module('account').controller('AccountEmailConfirmationCtrl', [
  '$scope', '$routeParams', 'Auth', 'User', function($scope, $routeParams, Auth, User) {
    User.activate_with_token($routeParams.userId, $routeParams.token).then(function(authenticated) {
      $scope.notify_success('Your email has been verified');
      return Auth.create_session({
        user_type: authenticated.user_type,
        auth_id: authenticated.auth_id,
        auth_provider: authenticated.auth_provider,
        token: authenticated.token
      });
    }, function() {
      return $scope.notify_error('We are unable to activate this account.');
    });
    return $scope.$on('session:created', function(ev, user) {
      return $scope.attemptLogin().then((function() {
        return $scope.redirect_to("dashboard." + (user.user_type.toLowerCase()) + ".profile", {
          success: 'Please proceed to furnish your account information'
        });
      }), function() {
        return $scope.notify_error('Unable to log you in');
      });
    });
  }
]);
angular.module('account').controller('AccountResetPasswordCtrl', [
  '$scope', '$routeParams', 'User', function($scope, $routeParams, User) {
    $scope.user = {
      new_password: ''
    };
    return $scope.submitForm = function() {
      return User.reset_password_with_token($routeParams.userId, $routeParams.token, $scope.user.new_password).then((function() {
        return $scope.redirect_to('home', {
          success: 'Your password is changed successfully. Please login'
        });
      }), function() {
        return $scope.notify_error('Unable to reset password. Token is invalid.');
      });
    };
  }
]);
angular.module('account').controller('EmployerLoginCtrl', [
  '$scope', 'Auth', 'CustomProvider', '$dialog', function($scope, Auth, CustomProvider, $dialog) {
    $scope.linkedinConnect = function() {
      return CustomProvider.connect('linkedin', 'Employer', 'employer');
    };
    $scope.submitForm = function() {
      $scope.clear_notifications();
      return Auth.authenticate('Employer', $scope.user.email, 'local', $scope.user.password);
    };
    return $scope.forgotPassword = function() {
      return $dialog.dialog().open('dialogs/account.forgot_password.html').then(function(result) {
        if (result != null) {
          return Auth.forgot_password('Employer', result, 'local');
        }
      });
    };
  }
]);
angular.module('account').controller('EmployerLoginCustomProviderCtrl', [
  '$scope', 'Auth', 'MemoryStore', function($scope, Auth, MemoryStore) {
    var info;
    info = MemoryStore.get('auth_info');
    $scope.user = info;
    console.log(info);
    MemoryStore.clear();
    $scope.submitForm = function() {
      $scope.clear_notifications();
      return Auth.authenticate('Employer', $scope.user.auth_id, $scope.user.auth_provider, $scope.user.password);
    };
    return $scope.forgotPassword = function() {
      return Auth.forgot_password(info.user_class, info.auth_id, info.auth_provider);
    };
  }
]);
angular.module('account').controller('EmployerRegisterCtrl', [
  '$scope', 'Auth', 'CustomProvider', function($scope, Auth, CustomProvider) {
    $scope.linkedinConnect = function() {
      return CustomProvider.connect('linkedin', 'Employer', 'employer');
    };
    return $scope.submitForm = function() {
      var additional_fields;
      $scope.clear_notifications();
      additional_fields = {
        first_name: $scope.user.first_name,
        last_name: $scope.user.last_name,
        photo_url: 'styles/img/profile.jpg'
      };
      return Auth.register('Employer', $scope.user.email, 'local', $scope.user.email, $scope.user.password, additional_fields);
    };
  }
]);
angular.module('account').controller('EmployerRegisterCustomProviderCtrl', [
  '$scope', 'Auth', 'MemoryStore', function($scope, Auth, MemoryStore) {
    var info;
    info = MemoryStore.get('auth_info');
    console.log(info);
    $scope.user = info;
    MemoryStore.clear();
    return $scope.submitForm = function() {
      $scope.clear_notifications();
      return Auth.register('Employer', $scope.user.auth_id, $scope.user.auth_provider, $scope.user.email, $scope.user.password, $scope.user.additional_fields);
    };
  }
]);
angular.module('account').controller('FreelancerLoginCtrl', [
  '$scope', 'Auth', 'CustomProvider', '$dialog', function($scope, Auth, CustomProvider, $dialog) {
    $scope.linkedinConnect = function() {
      return CustomProvider.connect('linkedin', 'Freelancer', 'freelancer');
    };
    $scope.submitForm = function() {
      $scope.clear_notifications();
      return Auth.authenticate('Freelancer', $scope.user.email, 'local', $scope.user.password);
    };
    return $scope.forgotPassword = function() {
      return $dialog.dialog().open('dialogs/account.forgot_password.html').then(function(result) {
        if (result != null) {
          return Auth.forgot_password('Freelancer', result, 'local');
        }
      });
    };
  }
]);
angular.module('account').controller('FreelancerLoginCustomProviderCtrl', [
  '$scope', 'Auth', 'MemoryStore', function($scope, Auth, MemoryStore) {
    var info;
    info = MemoryStore.get('auth_info');
    $scope.user = info;
    MemoryStore.clear();
    $scope.submitForm = function() {
      $scope.clear_notifications();
      return Auth.authenticate('Freelancer', $scope.user.auth_id, $scope.user.auth_provider, $scope.user.password);
    };
    return $scope.forgotPassword = function() {
      return Auth.forgot_password(info.user_class, info.auth_id, info.auth_provider);
    };
  }
]);
angular.module('account').controller('FreelancerRegisterCtrl', [
  '$scope', 'Auth', 'CustomProvider', function($scope, Auth, CustomProvider) {
    $scope.linkedinConnect = function() {
      return CustomProvider.connect('linkedin', 'Freelancer', 'freelancer');
    };
    return $scope.submitForm = function() {
      var additional_fields;
      $scope.clear_notifications();
      additional_fields = {
        first_name: $scope.user.first_name,
        last_name: $scope.user.last_name,
        photo_url: 'styles/img/profile.jpg'
      };
      return Auth.register('Freelancer', $scope.user.email, 'local', $scope.user.email, $scope.user.password, additional_fields);
    };
  }
]);
angular.module('account').controller('FreelancerRegisterCustomProviderCtrl', [
  '$scope', 'Auth', 'MemoryStore', function($scope, Auth, MemoryStore) {
    var info;
    info = MemoryStore.get('auth_info');
    console.log(info);
    $scope.user = info;
    MemoryStore.clear();
    return $scope.submitForm = function() {
      $scope.clear_notifications();
      return Auth.register('Freelancer', $scope.user.auth_id, $scope.user.auth_provider, $scope.user.email, $scope.user.password, $scope.user.additional_fields);
    };
  }
]);
angular.module('account').run([
  '$rootScope', 'Auth', '$q', function($rootScope, Auth, $q) {
    $rootScope.logout = function() {
      Auth.logout();
      $rootScope.$broadcast('logged_out');
      return $rootScope.redirect_to('', {
        success: 'You are logged out'
      });
    };
    $rootScope.attemptLogin = function(opts) {
      var authenticated, deferred;
      if (opts == null) {
        opts = {};
      }
      deferred = $q.defer();
      if (($rootScope.authenticated != null) && $rootScope.authenticated) {
        deferred.resolve($rootScope.current_user);
      } else {
        authenticated = Auth.user({
          delegate: true
        });
        authenticated.then((function(user) {
          $rootScope.current_user = user;
          $rootScope.authenticated = true;
          $rootScope.user_class = user.user_type;
          $rootScope.user_type = user.user_type.toLowerCase();
          if (typeof opts.successHandler === "function") {
            opts.successHandler(user);
          }
          return deferred.resolve(user);
        }), function() {
          $rootScope.current_user = null;
          $rootScope.authenticated = false;
          $rootScope.user_class = 'User';
          $rootScope.user_type = 'guest';
          if (typeof opts.failedHandler === "function") {
            opts.failedHandler(user);
          }
          return deferred.reject('user is not logged in');
        });
      }
      return deferred.promise;
    };
    angular.forEach(['logged_out', 'login:started'], function(event) {
      return $rootScope.$on(event, function() {
        $rootScope.current_user = null;
        $rootScope.authenticated = false;
        $rootScope.user_class = 'User';
        return $rootScope.user_type = 'guest';
      });
    });
    $rootScope.$on('authenticate:success', function(event, response) {
      return $rootScope.attemptLogin({
        successHandler: function(user) {
          var success_msg;
          success_msg = response.register ? 'Welcome to CreativesAtWork!' : 'You are logged in';
          return $rootScope.redirect_to("dashboard." + (user.user_type.toLowerCase()) + ".profile", {
            success: success_msg
          });
        }
      });
    });
    return $rootScope.attemptLogin();
  }
]);
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

angular.module('account').factory('User', [
  'Restangular', '$rootScope', '$filter', function(Restangular, $rootScope, $filter) {
    var User, _ref;
    User = (function(_super) {
      __extends(User, _super);

      function User() {
        _ref = User.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      User.prototype.get_from_account = function(user_type, auth_id, auth_provider) {
        this.before_operation({
          user_type: user_type,
          auth_id: auth_id,
          auth_provider: auth_provider
        });
        return Restangular.all('users').customGET('get_from_account', {
          user_type: user_type,
          auth_id: auth_id,
          auth_provider: auth_provider
        });
      };

      User.prototype.authenticate_with_token = function(session) {
        this.before_operation({
          session: session
        });
        return Restangular.all('users').customGET('authenticate_with_token', session);
      };

      User.prototype.register = function(user_type, auth_id, auth_provider, email, password, additional_fields) {
        var fields;
        fields = {
          user_type: user_type,
          auth_id: auth_id,
          auth_provider: auth_provider,
          email: email,
          password: password,
          additional_fields: additional_fields
        };
        this.before_operation(fields);
        return Restangular.all('users').customPOST('register', {}, {}, fields);
      };

      User.prototype.authenticate = function(user_type, auth_id, auth_provider, password) {
        var fields;
        fields = {
          user_type: user_type,
          auth_id: auth_id,
          auth_provider: auth_provider,
          password: password
        };
        this.before_operation(fields);
        return Restangular.all('users').customGET('authenticate', fields);
      };

      User.prototype.activate_with_token = function(user_id, token) {
        var fields;
        fields = {
          token: token
        };
        this.before_operation(fields);
        return Restangular.one('users', user_id).customGET('activate_with_token', fields);
      };

      User.prototype.forgot_password = function(user_type, auth_id, auth_provider) {
        var fields;
        fields = {
          user_type: user_type,
          auth_id: auth_id,
          auth_provider: auth_provider
        };
        this.before_operation(fields);
        return Restangular.all('users').customPOST('forgot_password', {}, {}, fields);
      };

      User.prototype.reset_password_with_token = function(user_id, token, new_password) {
        var fields;
        fields = {
          token: token,
          new_password: new_password
        };
        console.log(fields);
        this.before_operation(fields);
        return Restangular.one('users', user_id).customPOST('reset_password_with_token', {}, {}, fields);
      };

      User.prototype.clear_notifications = function(user_id) {
        return Restangular.one('users', user_id).customPOST('clear_notifications', {}, {});
      };

      return User;

    })(BaseModel);
    return new User(Restangular, $rootScope, $filter, 'user', 'users');
  }
]);
resolvables['current_user'] = [
  'Auth', '$q', '$rootScope', function(Auth, $q, $rootScope) {
    var authenticated;
    authenticated = Auth.user({
      delegate: true
    });
    return authenticated.then((function(user) {
      $rootScope.current_user = user;
      $rootScope.authenticated = true;
      $rootScope.user_class = user.user_type;
      $rootScope.user_type = user.user_type.toLowerCase();
      return user;
    }), function() {
      $rootScope.current_user = null;
      $rootScope.authenticated = false;
      $rootScope.user_class = 'User';
      $rootScope.user_type = 'guest';
      $rootScope.notify_error('Please login first', false);
      return $q.reject('Access not allowed');
    });
  }
];
angular.module('account').service('Auth', [
  '$rootScope', '$http', 'ErrorProcessor', 'Session', 'User', '$q', function($rootScope, $http, ErrorProcessor, Session, User, $q) {
    this.create_session = function(authenticated) {
      Session.set(authenticated.user_type, authenticated.auth_id, authenticated.auth_provider, authenticated.token);
      $http.defaults.headers.common['User-Authorization'] = Session.as_json();
      console.log(authenticated);
      return $rootScope.$broadcast('session:created', authenticated);
    };
    this.user = function(options) {
      var promise;
      if (options == null) {
        options = {};
      }
      if (Session.isEmpty()) {
        return $q.reject('Session does not exist');
      } else {
        promise = this.authenticate_with_token(Session.attributes());
        if ((options.delegate != null) && options.delegate) {
          return promise;
        } else {
          return promise.then((function(user) {
            return user;
          }), function(response) {
            return ErrorProcessor.process_login(response);
          });
        }
      }
    };
    this.register = function(user_type, auth_id, auth_provider, email, password, additional_fields) {
      var _this = this;
      return User.register(user_type, auth_id, auth_provider, email, password, additional_fields).then((function(response) {
        if (response.email_confirmation) {
          return $rootScope.notify_info('An email has been sent to verify your email address.');
        } else {
          return _this.authenticate(user_type, auth_id, auth_provider, password, true);
        }
      }), function(response) {
        console.log(response);
        return ErrorProcessor.process_registration(response);
      });
    };
    this.authenticate = function(user_type, auth_id, auth_provider, password, register, opts) {
      var _this = this;
      if (password == null) {
        password = null;
      }
      if (register == null) {
        register = false;
      }
      if (opts == null) {
        opts = {};
      }
      Session.destroy();
      $rootScope.$broadcast('login:started');
      return User.authenticate(user_type, auth_id, auth_provider, password).then((function(authenticated) {
        _this.create_session(authenticated);
        $rootScope.$broadcast('authenticate:success', {
          authenticated: authenticated,
          register: register
        });
        return typeof opts.successHandler === "function" ? opts.successHandler(authenticated) : void 0;
      }), function(response) {
        ErrorProcessor.process_login(response);
        return typeof opts.errorHandler === "function" ? opts.errorHandler(response) : void 0;
      });
    };
    this.authenticate_with_token = function(session_attributes) {
      return User.authenticate_with_token(session_attributes);
    };
    this.logout = function() {
      return Session.destroy();
    };
    this.forgot_password = function(user_type, auth_id, auth_provider, opts) {
      if (opts == null) {
        opts = {};
      }
      return User.forgot_password(user_type, auth_id, auth_provider).then((function(success) {
        $rootScope.notify_success('An email has been sent to you to reset your password');
        return typeof opts.successHandler === "function" ? opts.successHandler(success) : void 0;
      }), function(response) {
        console.log(response);
        ErrorProcessor.process_forgot_password(response);
        return typeof opts.errorHandler === "function" ? opts.errorHandler(response) : void 0;
      });
    };
    return this;
  }
]);
angular.module('account').factory('CustomProvider', [
  'Auth', 'User', '$rootScope', 'MemoryStore', '$timeout', function(Auth, User, $rootScope, MemoryStore, $timeout) {
    var CustomProvider;
    CustomProvider = (function() {
      var authenticate_with_custom_provider, connectFailure, facebookCallback, linkedInCallback;

      function CustomProvider() {}

      connectFailure = function() {
        return $rootScope.notify_error('You need to authorize this app in order to log in');
      };

      authenticate_with_custom_provider = function(info) {
        return $timeout((function() {
          var promise;
          promise = User.get_from_account(info.user_class, info.auth_id, info.auth_provider);
          return promise.then(function() {
            MemoryStore.set('auth_info', info);
            return $rootScope.redirect_to("" + info.user_type + ".login.custom_provider");
          }, function() {
            MemoryStore.set('auth_info', info);
            return $rootScope.redirect_to("" + info.user_type + ".register.custom_provider");
          });
        }), 100);
      };

      facebookCallback = function(response, user_class, user_type) {
        if (response.authResponse) {
          return FB.api("/me", function(response) {
            var _ref;
            return authenticate_with_custom_provider({
              user_class: user_class,
              user_type: user_type,
              auth_id: response.id,
              auth_provider: 'facebook',
              email: response.email,
              additional_fields: {
                first_name: response.first_name,
                last_name: response.last_name,
                location: (_ref = response.location) != null ? _ref.name : void 0,
                photo_url: "http://graph.facebook.com/" + response.id + "/picture"
              }
            });
          });
        } else {
          return connectFailure();
        }
      };

      linkedInCallback = function(user_class, user_type) {
        return IN.API.Profile('me').fields('id', 'email-address', 'first-name', 'last-name', 'location', 'summary', 'specialties', 'positions', 'picture-url', 'public-profile-url', 'skills', 'certifications', 'educations', 'date-of-birth', 'three-current-positions').result(function(result) {
          var fields, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
          fields = {
            user_class: user_class,
            user_type: user_type,
            auth_id: result.values[0].emailAddress,
            auth_provider: 'linkedin',
            email: result.values[0].emailAddress,
            additional_fields: {
              first_name: result.values[0].firstName,
              last_name: result.values[0].lastName,
              photo_url: result.values[0].pictureUrl,
              location: (_ref = result.values[0].location) != null ? _ref.name : void 0
            }
          };
          if (user_type === 'freelancer') {
            fields.additional_fields.job_title = (_ref1 = result.values[0].threeCurrentPositions) != null ? (_ref2 = _ref1.values) != null ? (_ref3 = _ref2[0]) != null ? _ref3.title : void 0 : void 0 : void 0;
            fields.additional_fields.professional_history = (_ref4 = result.values[0].threeCurrentPositions) != null ? (_ref5 = _ref4.values) != null ? (_ref6 = _ref5[0]) != null ? _ref6.summary : void 0 : void 0 : void 0;
            fields.additional_fields.other_information = result.values[0].summary;
          }
          IN.API.Raw('/people/~/picture-urls::(original)').result(function(res) {
            return fields.additional_fields.photo_url = res.values[0];
          });
          return authenticate_with_custom_provider(fields);
        });
      };

      CustomProvider.prototype.connect = function(providerName, user_class, user_type) {
        $rootScope.start_ajax();
        return $timeout(function() {
          var _ref;
          switch (providerName) {
            case 'facebook':
              return FB.login((function(response) {
                return facebookCallback(response, user_class, user_type);
              }), {
                scope: 'email, user_about_me, user_location, publish_actions'
              });
            case 'linkedin':
              if ((_ref = IN.User) != null ? _ref.isAuthorized() : void 0) {
                return linkedInCallback(user_class, user_type);
              } else {
                IN.User.authorize();
                return IN.Event.on(IN, 'auth', function() {
                  return linkedInCallback(user_class, user_type);
                });
              }
          }
        }, 100);
      };

      return CustomProvider;

    })();
    return new CustomProvider;
  }
]);
angular.module('account').factory('Session', [
  '$cookieStore', function($cookieStore) {
    var Session;
    Session = (function() {
      function Session() {
        this._init();
      }

      Session.prototype._init = function() {
        var loaded;
        loaded = $cookieStore.get('AuthSession');
        this.user_type = loaded != null ? loaded.user_type : void 0;
        this.auth_id = loaded != null ? loaded.auth_id : void 0;
        this.auth_provider = loaded != null ? loaded.auth_provider : void 0;
        return this.token = loaded != null ? loaded.token : void 0;
      };

      Session.prototype.attributes = function() {
        return {
          user_type: this.user_type,
          auth_id: this.auth_id,
          auth_provider: this.auth_provider,
          token: this.token
        };
      };

      Session.prototype.set = function(user_type, auth_id, auth_provider, token) {
        this.user_type = user_type;
        this.auth_id = auth_id;
        this.auth_provider = auth_provider;
        this.token = token;
        return $cookieStore.put('AuthSession', this.attributes());
      };

      Session.prototype.destroy = function() {
        this.user_type = null;
        this.auth_id = null;
        this.auth_provider = null;
        this.token = null;
        return $cookieStore.remove('AuthSession');
      };

      Session.prototype.as_json = function() {
        return JSON.stringify(this.attributes());
      };

      Session.prototype.isEmpty = function() {
        return this.as_json === '{}';
      };

      return Session;

    })();
    return new Session;
  }
]);
angular.module('account').config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
    return $locationProvider.html5Mode(false);
  }
]);
angular.module('common').config([
  '$dialogProvider', function($dialogProvider) {
    return $dialogProvider.options({
      backdrop: true,
      dialogClass: 'modal',
      backdropClass: 'modal-backdrop',
      transitionClass: 'fade',
      triggerClass: 'in',
      dialogOpenClass: 'modal-open',
      backdropFade: true,
      dialogFade: true,
      keyboard: true,
      backdropClick: true,
      controller: [
        '$scope', 'dialog', function($scope, dialog) {
          return $scope.close = function(result) {
            return dialog.close(result);
          };
        }
      ]
    });
  }
]);
angular.module('common').config([
  '$httpProvider', function($httpProvider) {
    var interceptor;
    interceptor = [
      "$q", "$injector", "$rootScope", function($q, $injector, $rootScope) {
        var error, success;
        success = function(response) {
          var $http;
          $http = $injector.get("$http");
          if ($http.pendingRequests.length < 1) {
            $rootScope.$broadcast('ajax_loading:stopped');
          }
          return response;
        };
        error = function(response) {
          var $http;
          $http = $injector.get("$http");
          if ($http.pendingRequests.length < 1) {
            $rootScope.$broadcast('ajax_loading:stopped');
          }
          return $q.reject(response);
        };
        return function(promise) {
          $rootScope.$broadcast('ajax_loading:started');
          return promise.then(success, error);
        };
      }
    ];
    return $httpProvider.responseInterceptors.push(interceptor);
  }
]);
angular.module('common').config([
  'RestangularProvider', 'ServiceEndpoint', function(RestangularProvider, ServiceEndpoint) {
    RestangularProvider.setBaseUrl(ServiceEndpoint);
    RestangularProvider.setListTypeIsArray(true);
    RestangularProvider.setFullRequestInterceptor(function(element, operation, route, url, headers, params) {
      var k, _i, _len, _ref;
      if ((element != null ? element._deny_fields : void 0) != null) {
        _ref = element._deny_fields;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          k = _ref[_i];
          delete element[k];
        }
      }
      return {
        element: element,
        operation: operation,
        route: route,
        url: url,
        headers: headers,
        params: params
      };
    });
    return RestangularProvider.setResponseExtractor(function(response, operation) {
      return response;
    });
  }
]);
angular.module('common').directive('alerter', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        closeCountDown: '@'
      },
      controller: [
        '$scope', '$timeout', function($scope, $timeout) {
          var clearAlertTimeout, stack_topright;
          $scope.alerts = [];
          stack_topright = {
            dir1: "down",
            dir2: "left",
            push: "top",
            spacing1: 25,
            spacing2: 25,
            firstpos1: 125,
            firstpos2: 25
          };
          clearAlertTimeout = null;
          $.pnotify.defaults.history = false;
          $scope.addAlert = function(type, message) {
            var alert, _alerts, _closeCountDown;
            _alerts = (function() {
              var _i, _len, _ref, _results;
              _ref = $scope.alerts;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                alert = _ref[_i];
                _results.push(alert.msg);
              }
              return _results;
            })();
            if (_alerts.indexOf(message) >= 0) {
              return;
            }
            $scope.alerts.push({
              type: type,
              msg: message
            });
            $.pnotify({
              text: message,
              type: type,
              stack: stack_topright
            });
            if (clearAlertTimeout != null) {
              $timeout.cancel(clearAlertTimeout);
            }
            _closeCountDown = 3000;
            if (angular.isDefined($scope.closeCountDown)) {
              _closeCountDown = $scope.closeCountDown;
            }
            return clearAlertTimeout = $timeout((function() {
              return $scope.clearAlerts();
            }), _closeCountDown);
          };
          $scope.clearAlerts = function() {
            $scope.alerts = [];
            return $.pnotify_remove_all();
          };
          /* hook to notification event*/

          $scope.$on('notification:info', function(e, msg) {
            return $scope.addAlert('info', msg);
          });
          $scope.$on('notification:success', function(e, msg) {
            return $scope.addAlert('success', msg);
          });
          $scope.$on('notification:error', function(e, msg) {
            return $scope.addAlert('error', msg);
          });
          return $scope.$on('notification:clear', function() {
            return $scope.clearAlerts();
          });
        }
      ]
    };
  }
]);
angular.module('common').directive('fileupload', [
  function() {
    return {
      restrict: 'A',
      scope: {
        uploaderId: '@',
        serverDomain: '@',
        servicePath: '@'
      },
      link: function(scope, element, attrs) {
        var options;
        options = {
          url: "" + attrs.serverDomain + "/" + attrs.servicePath,
          dataType: 'json',
          add: function(e, data) {
            scope.$emit('fileupload:add', {
              id: attrs.uploaderId,
              domain: attrs.serverDomain,
              path: attrs.servicePath,
              data: data
            });
            return data.submit();
          },
          done: function(e, data) {
            return scope.$emit('fileupload:done', {
              id: attrs.uploaderId,
              domain: attrs.serverDomain,
              path: attrs.servicePath,
              data: data
            });
          },
          progress: function(e, data) {
            return scope.$emit('fileupload:progress', {
              id: attrs.uploaderId,
              domain: attrs.serverDomain,
              path: attrs.servicePath,
              data: data
            });
          },
          fail: function(e, data) {
            return scope.$emit('fileupload:fail', {
              id: attrs.uploaderId,
              domain: attrs.serverDomain,
              path: attrs.servicePath,
              data: data
            });
          }
        };
        return element.fileupload(options);
      }
    };
  }
]);
angular.module('common').directive('nailthumb', [
  function() {
    return {
      restrict: 'A',
      scope: {
        method: '@',
        width: '@',
        height: '@',
        replaceAnimation: '@',
        ngSrc: '@'
      },
      link: function(scope, element, attrs) {
        var options;
        options = {
          method: 'crop',
          width: '125',
          height: '125',
          replaceAnimation: 'fade'
        };
        if (attrs.method != null) {
          options.method = attrs.method;
        }
        if (attrs.width != null) {
          options.width = attrs.width;
        }
        if (attrs.height != null) {
          options.height = attrs.height;
        }
        if (attrs.replaceAnimation != null) {
          options.replaceAnimation = attrs.replaceAnimation;
        }
        return attrs.$observe('ngSrc', function() {
          return element.nailthumb(options);
        });
      }
    };
  }
]);
angular.module('common').directive("passwordVerify", function() {
  return {
    require: "ngModel",
    scope: {
      passwordVerify: "="
    },
    link: function(scope, element, attrs, ctrl) {
      return scope.$watch((function() {
        var combined;
        combined = void 0;
        if (scope.passwordVerify || ctrl.$viewValue) {
          combined = scope.passwordVerify + "_" + ctrl.$viewValue;
        }
        return combined;
      }), function(value) {
        if (value) {
          return ctrl.$parsers.unshift(function(viewValue) {
            var origin;
            origin = scope.passwordVerify;
            if (origin !== viewValue) {
              ctrl.$setValidity("passwordVerify", false);
              return undefined;
            } else {
              ctrl.$setValidity("passwordVerify", true);
              return viewValue;
            }
          });
        }
      });
    }
  };
});
angular.module('common').directive('spinner', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/common/spinner.html',
      controller: [
        '$scope', function($scope) {
          $scope.$on('ajax_loading:started', function() {
            return $scope.isLoading = true;
          });
          return $scope.$on('ajax_loading:stopped', function() {
            return $scope.isLoading = false;
          });
        }
      ],
      link: function() {
        var opts, target;
        opts = {
          lines: 12,
          length: 7,
          width: 5,
          radius: 10,
          color: "#fff",
          speed: 1,
          trail: 66,
          shadow: true,
          left: '78px',
          top: '78px'
        };
        target = document.getElementById("spin");
        return new Spinner(opts).spin(target);
      }
    };
  }
]);
angular.module('common').directive('tagsinput', [
  function() {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        var initialized, options, read;
        if (!ngModel) {
          return;
        }
        initialized = false;
        options = {
          onChange: function() {
            return read();
          }
        };
        read = function() {
          return ngModel.$setViewValue(element.val());
        };
        return ngModel.$render = function() {
          if (angular.isString(ngModel.$viewValue)) {
            element.val(ngModel.$viewValue);
            element.attr('value', ngModel.$viewValue);
          }
          if (!initialized) {
            element.tagsInput(options);
            return initialized = true;
          }
        };
      }
    };
  }
]);
angular.module('common').run([
  '$rootScope', function($rootScope) {
    $rootScope.start_ajax = function() {
      return $rootScope.$broadcast('ajax_loading:started');
    };
    return $rootScope.stop_ajax = function() {
      return $rootScope.$broadcast('ajax_loading:stopped');
    };
  }
]);
angular.module('common').run([
  '$rootScope', '$log', function($rootScope, $log) {
    $rootScope.alert = function(msg) {
      return alert(msg);
    };
    $rootScope.log = function(msg) {
      return $log.log(msg);
    };
    $rootScope.warn = function(msg) {
      return $log.warn(msg);
    };
    return $rootScope.error = function(msg) {
      return $log.error(msg);
    };
  }
]);
angular.module('common').run([
  '$rootScope', function($rootScope) {
    $rootScope.notify_info = function(msg, append) {
      if (append == null) {
        append = false;
      }
      if (!append) {
        $rootScope.$broadcast('notification:clear');
      }
      return $rootScope.$broadcast('notification:info', msg);
    };
    $rootScope.notify_error = function(msg, append) {
      if (append == null) {
        append = true;
      }
      if (!append) {
        $rootScope.$broadcast('notification:clear');
      }
      return $rootScope.$broadcast('notification:error', msg);
    };
    $rootScope.notify_success = function(msg, append) {
      if (append == null) {
        append = false;
      }
      if (!append) {
        $rootScope.$broadcast('notification:clear');
      }
      return $rootScope.$broadcast('notification:success', msg);
    };
    return $rootScope.clear_notifications = function() {
      return $rootScope.$broadcast('notification:clear');
    };
  }
]);
angular.module('common').run([
  '$rootScope', '$location', function($rootScope, $location) {
    return $rootScope.redirect_to = function(path, options) {
      if (options == null) {
        options = {};
      }
      path = path.replace(/^\//, '');
      if (options.success != null) {
        $rootScope.notify_success(options.success);
      }
      if (options.info != null) {
        $rootScope.notify_info(options.info);
      }
      if (options.error != null) {
        $rootScope.notify_error(options.error);
      }
      return $location.path("/" + path);
    };
  }
]);
angular.module('common').run([
  '$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$current_route = '/';
    return $rootScope.$on('$routeChangeSuccess', function() {
      return $rootScope.$current_route = $location.path();
    });
  }
]);
/*
Converts variable-esque naming conventions to something presentational, capitalized words separated by space.
@param {String} value The value to be parsed and prettified.
@param {String} [inflector] The inflector to use. Default: humanize.
@return {String}
@example {{ 'Here Is my_phoneNumber' | inflector:'humanize' }} => Here Is My Phone Number
{{ 'Here Is my_phoneNumber' | inflector:'underscore' }} => here_is_my_phone_number
{{ 'Here Is my_phoneNumber' | inflector:'variable' }} => hereIsMyPhoneNumber
*/

angular.module('common').filter('inflector', function() {
  var breakup, inflectors, ucwords;
  ucwords = function(text) {
    return text.replace(/^([a-z])|\s+([a-z])/g, function($1) {
      return $1.toUpperCase();
    });
  };
  breakup = function(text, separator) {
    return text.replace(/[A-Z]/g, function(match) {
      return separator + match;
    });
  };
  inflectors = {
    humanize: function(value) {
      return ucwords(breakup(value, " ").split("_").join(" "));
    },
    underscore: function(value) {
      return value.substr(0, 1).toLowerCase() + breakup(value.substr(1), "_").toLowerCase().split(" ").join("_");
    },
    variable: function(value) {
      value = value.substr(0, 1).toLowerCase() + ucwords(value.split("_").join(" ")).substr(1).split(" ").join("");
      return value;
    }
  };
  return function(text, inflector, separator) {
    if (inflector !== false && angular.isString(text)) {
      inflector = inflector || "humanize";
      return inflectors[inflector](text);
    } else {
      return text;
    }
  };
});
var BaseModel;

BaseModel = (function() {
  function BaseModel(Restangular, $rootScope, $filter, singularName, pluralName) {
    this.Restangular = Restangular;
    this.$rootScope = $rootScope;
    this.$filter = $filter;
    this.singularName = singularName;
    this.pluralName = pluralName;
    this.humanizedSingularName = this.$filter('inflector')(this.singularName, 'humanize');
    this.humanizedPluralName = this.$filter('inflector')(this.pluralName, 'humanize');
  }

  BaseModel.prototype.before_operation = function(event) {
    return this.$rootScope.$broadcast('ajax_loading:started');
  };

  BaseModel.prototype.operation_success = function(event) {
    return this.$rootScope.$broadcast('ajax_loading:stopped');
  };

  BaseModel.prototype.operation_failed = function(event) {
    return this.$rootScope.$broadcast('ajax_loading:stopped');
  };

  BaseModel.prototype.create = function(model, options) {
    var opts, promise,
      _this = this;
    if (options == null) {
      options = {};
    }
    this.before_operation({
      model: model,
      options: options
    });
    promise = this.Restangular.all(this.pluralName).post(model);
    if ((options.delegate != null) && options.delegate) {
      return promise;
    } else {
      opts = {
        notify_success: true,
        notify_error: true
      };
      if (options.notify_success != null) {
        opts.notify_success = options.notify_success;
      }
      if (options.notify_error != null) {
        opts.notify_error = options.notify_error;
      }
      return promise.then((function(item) {
        _this.operation_success({
          item: item
        });
        if (opts.notify_success) {
          _this.$rootScope.notify_success("" + _this.humanizedSingularName + " created successfully");
        }
        return item;
      }), function(response) {
        _this.operation_failed({
          response: response,
          model: model,
          options: options
        });
        if (opts.notify_error) {
          _this.$rootScope.notify_error("Failed to create " + _this.humanizedSingularName);
        }
        console.log('@create error: ');
        return console.log(response);
      });
    }
  };

  BaseModel.prototype.count = function(options) {
    var promise, queries,
      _this = this;
    if (options == null) {
      options = {};
    }
    this.before_operation({
      options: options
    });
    queries = {};
    if (options.conditions != null) {
      queries.conditions = JSON.stringify(options.conditions);
    }
    if (options.search != null) {
      queries.search = options.search;
    }
    promise = this.Restangular.all(this.pluralName).customGET('count', queries);
    if ((options.delegate != null) && options.delegate) {
      return promise;
    } else {
      return promise.then((function(count) {
        _this.operation_success({
          count: count
        });
        return count;
      }), function(response) {
        _this.operation_failed({
          response: response,
          options: options
        });
        console.log('@count error:');
        return console.log(response);
      });
    }
  };

  BaseModel.prototype.all = function(options) {
    var promise, queries,
      _this = this;
    if (options == null) {
      options = {};
    }
    this.before_operation({
      options: options
    });
    queries = {
      limit: 1000,
      offset: 0,
      order: 'created_at DESC',
      page: 1,
      per_page: 100
    };
    if (options.limit != null) {
      queries.limit = options.limit;
    }
    if (options.offset != null) {
      queries.offset = options.offset;
    }
    if (options.order != null) {
      queries.order = options.order;
    }
    if (options.page != null) {
      queries.page = options.page;
    }
    if (options.per_page != null) {
      queries.per_page = options.per_page;
    }
    if (options.includes != null) {
      queries.includes = JSON.stringify(options.includes);
    }
    if (options.conditions != null) {
      queries.conditions = JSON.stringify(options.conditions);
    }
    if (options.search != null) {
      queries.search = options.search;
    }
    promise = this.Restangular.all(this.pluralName).getList(queries);
    if ((options.delegate != null) && options.delegate) {
      return promise;
    } else {
      return promise.then((function(list) {
        _this.operation_success({
          list: list
        });
        return list;
      }), function(response) {
        _this.operation_failed({
          response: response,
          options: options
        });
        console.log('@all error:');
        return console.log(response);
      });
    }
  };

  BaseModel.prototype.find = function(id, options) {
    var promise, queries,
      _this = this;
    if (options == null) {
      options = {};
    }
    this.before_operation({
      id: id,
      options: options
    });
    queries = {};
    if (options.includes != null) {
      queries.includes = JSON.stringify(options.includes);
    }
    promise = this.Restangular.one(this.pluralName, id).get(queries);
    if ((options.delegate != null) && options.delegate) {
      return promise;
    } else {
      return promise.then((function(item) {
        _this.operation_success({
          item: item
        });
        return item;
      }), function(response) {
        _this.operation_failed({
          response: response
        });
        _this.$rootScope.notify_error("Unable to find " + _this.humanizedSingularName);
        console.log('@find error');
        return console.log(response);
      });
    }
  };

  BaseModel.prototype.destroy = function(id, options) {
    var promise,
      _this = this;
    if (options == null) {
      options = {};
    }
    this.before_operation({
      id: id,
      options: options
    });
    console.log(id);
    console.log(this.Restangular.one(this.pluralName, id).remove);
    promise = this.Restangular.one(this.pluralName, id).remove();
    if ((options.delegate != null) && options.delegate) {
      return promise;
    } else {
      return promise.then((function(item) {
        return _this.operation_success({
          item: item
        });
      }), function(response) {
        _this.operation_failed({
          response: response
        });
        _this.$rootScope.notify_error("Unable to delete " + _this.humanizedSingularName);
        console.log('@destroy error');
        return console.log(response);
      });
    }
  };

  return BaseModel;

})();
angular.module('common').provider('Warden', function() {
  var Warden;
  Warden = (function() {
    function Warden() {}

    Warden.prototype.$get = function() {};

    Warden.prototype.simplify = function(routeProvider) {
      this.routeProvider = routeProvider;
      this.requireUser = false;
      this.omitView = false;
      this.omitController = false;
      return this;
    };

    Warden.prototype.set_template_prefix = function(prefix) {
      this.templatePrefix = prefix;
      if (prefix.slice(-1) !== '/') {
        this.templatePrefix += '/';
      }
      return this;
    };

    Warden.prototype.require_user = function() {
      this.requireUser = true;
      return this;
    };

    Warden.prototype.omit_view = function() {
      this.omitView = true;
      return this;
    };

    Warden.prototype.omit_controller = function() {
      this.omitController = true;
      return this;
    };

    Warden.prototype.when = function(route, options) {
      var cleanRoute, controller, controllerTokens, resolve, resolves, routeStr, templateUrl, token, _i, _len, _ref;
      if (options == null) {
        options = {};
      }
      if (route.slice(0, 1) === '/') {
        route = route.slice(1);
      }
      cleanRoute = route.split('/')[0];
      controllerTokens = (function() {
        var _i, _len, _ref, _results;
        _ref = cleanRoute.split(/\.|_/);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          token = _ref[_i];
          _results.push(token.capitalize());
        }
        return _results;
      })();
      routeStr = options.route || ("/" + route);
      controller = "" + (controllerTokens.join('')) + "Ctrl";
      templateUrl = "" + this.templatePrefix + cleanRoute + ".html";
      resolves = {};
      if (options.user == null) {
        options.user = this.requireUser;
      }
      if (options.omitView == null) {
        options.omitView = this.omitView;
      }
      if (options.omitController == null) {
        options.omitController = this.omitController;
      }
      if (options.user) {
        resolves.current_user = resolvables['current_user'];
      }
      if (options.resolves != null) {
        _ref = options.resolves;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          resolve = _ref[_i];
          resolves[resolve] = resolvables[resolve];
        }
      }
      if (options.omitView) {
        templateUrl = 'views/pages/empty.html';
      }
      if (options.templateUrl != null) {
        templateUrl = options.templateUrl;
      }
      if (options.omitController) {
        this.routeProvider.when(routeStr, {
          templateUrl: templateUrl,
          resolve: resolves
        });
      } else {
        this.routeProvider.when(routeStr, {
          templateUrl: templateUrl,
          controller: controller,
          resolve: resolves
        });
      }
      return this;
    };

    return Warden;

  })();
  return new Warden;
});
angular.module('common').service('ErrorProcessor', [
  '$rootScope', '$log', function($rootScope, $log) {
    this.process_save = function(response, defaultHandler) {
      var error, error_list, field, _ref, _results;
      switch (response.status) {
        case 422:
          _ref = response.data;
          _results = [];
          for (field in _ref) {
            error_list = _ref[field];
            _results.push((function() {
              var _i, _len, _results1;
              _results1 = [];
              for (_i = 0, _len = error_list.length; _i < _len; _i++) {
                error = error_list[_i];
                $log.error(error);
                _results1.push($rootScope.notify_error("" + field + " " + error));
              }
              return _results1;
            })());
          }
          return _results;
          break;
        default:
          if (defaultHandler != null) {
            return defaultHandler();
          } else {
            return $rootScope.notify_error('Unable to save.');
          }
      }
    };
    this.process_login = function(response, defaultHandler) {
      switch (response.status) {
        case 401:
          if ("message" in response.data) {
            return $rootScope.notify_error(response.data.message);
          }
          break;
        default:
          if (defaultHandler != null) {
            return defaultHandler();
          } else {
            return $rootScope.notify_error('Login failed');
          }
      }
    };
    this.process_registration = function(response, defaultHandler) {
      switch (response.status) {
        case 401:
          if ("message" in response.data) {
            return $rootScope.notify_error(response.data.message);
          }
          break;
        default:
          if (defaultHandler != null) {
            return defaultHandler();
          } else {
            return $rootScope.notify_error('Registration Failed');
          }
      }
    };
    this.process_forgot_password = function(response, defaultHandler) {
      switch (response.status) {
        case 401:
          if ("message" in response.data) {
            return $rootScope.notify_error(response.data.message);
          }
          break;
        default:
          if (defaultHandler != null) {
            return defaultHandler();
          } else {
            return $rootScope.notify_error('Sorry, we are unable to reset your password.');
          }
      }
    };
    return this;
  }
]);
angular.module('common').service('MemoryStore', [
  function() {
    var data;
    data = {};
    this.set = function(key, value) {
      return data[key] = value;
    };
    this.get = function(key) {
      return data[key];
    };
    this.del = function(key) {
      return delete data[key];
    };
    this.inspect = function() {
      return data;
    };
    this.clear = function() {
      return data = {};
    };
    return this;
  }
]);
angular.module('config').constant('ServiceEndpoint', 'http://creativesatwork.me\:3000');
angular.module('dashboard').controller('DashboardEmployerNotificationsCtrl', [
  '$scope', 'User', function($scope, User) {
    return User.clear_notifications($scope.current_user.id);
  }
]);
angular.module('dashboard').controller('DashboardEmployerProfileCtrl', [
  '$scope', '$rootScope', function($scope, $rootScope) {
    var init;
    $scope.hasError = function(input) {
      return !input.$valid && (input.$dirty || $scope.submitted);
    };
    $scope.submitForm = function() {
      $scope.submitted = true;
      if ($scope.form.$valid) {
        $scope.clear_notifications();
        return $rootScope.current_user.put().then((function(current_user) {
          $rootScope.current_user = current_user;
          return $scope.notify_success('Your profile is updated successfully');
        }), function() {
          window.scrollTo(0);
          return $scope.notify_error('Form has missing or invalid values');
        });
      } else {
        window.scrollTo(0);
        return angular.forEach($scope.form.$error, function(val, key) {
          return angular.forEach(val, function(inner_val) {
            var _ref;
            switch (key) {
              case 'required':
                if (inner_val.$error.required === true) {
                  return $scope.notify_error("" + ((_ref = inner_val.$name) != null ? _ref.humanize() : void 0) + " is missing.");
                } else if (angular.isArray(inner_val.$error.required)) {
                  return $scope.notify_error("" + (inner_val.$error.required[0].$name.humanize()) + " is missing");
                }
                break;
              case 'email':
                if (inner_val.$error.email === true) {
                  return $scope.notify_error("" + inner_val.$viewValue + " is not a valid email.");
                } else if (angular.isArray(inner_val.$error.email)) {
                  return $scope.notify_error("" + inner_val.$error.email[0].$viewValue + " is not a valid email.");
                }
                break;
              case 'url':
                if (inner_val.$error.url === true) {
                  return $scope.notify_error("" + inner_val.$viewValue + " is not a valid url.");
                } else if (angular.isArray(inner_val.$error.url)) {
                  return $scope.notify_error("" + inner_val.$error.url[0].$viewValue + " is not a valid url.");
                }
            }
          });
        });
      }
    };
    init = function() {
      return $scope.submitted = false;
    };
    return init();
  }
]);
angular.module('dashboard').controller('DashboardFreelancerNotificationsCtrl', [
  '$scope', 'User', function($scope, User) {
    return User.clear_notifications($scope.current_user.id);
  }
]);
angular.module('dashboard').controller('DashboardFreelancerProfileCtrl', [
  '$scope', 'job_categories', '$rootScope', function($scope, job_categories, $rootScope) {
    var init;
    $scope.$watch('current_user.job_title', function(new_val) {
      return angular.forEach($scope.jobTitles, function(cat_value, cat_key) {
        return angular.forEach(cat_value, function(value) {
          if (angular.equals(new_val, value)) {
            return angular.forEach(job_categories, function(jc_val) {
              if (angular.equals(jc_val.name, cat_key)) {
                console.log(jc_val);
                return $rootScope.current_user.job_category_id = jc_val.id;
              }
            });
          }
        });
      });
    });
    $scope.select2Options = {
      width: 290
    };
    $scope.$on('fileupload:add', function(e, data) {
      return $scope.$apply(function() {
        switch (data.id) {
          case 'avatar-uploader':
            return $scope.avatar_upload_state = 'Uploading...';
          case 'portfolio-uploader':
            return $scope.portfolio_upload_state = 'Uploading...';
        }
      });
    });
    $scope.$on('fileupload:done', function(e, data) {
      var url, _ref, _ref1, _ref2;
      url = (_ref = data.data.result) != null ? (_ref1 = _ref.data) != null ? (_ref2 = _ref1.content) != null ? _ref2.url : void 0 : void 0 : void 0;
      if (url != null) {
        return $scope.$apply(function() {
          switch (data.id) {
            case 'avatar-uploader':
              $scope.avatar_upload_state = '';
              $rootScope.current_user.photo_url = url;
              return $rootScope.current_user.put().then((function(current_user) {
                $scope.notify_success('New profile picture saved.');
                return $scope.$apply();
              }), function() {
                return $scope.notify_error('Unable to change profile picture');
              });
            case 'portfolio-uploader':
              $scope.portfolio_upload_state = '';
              return $rootScope.current_user.portfolio_images.push({
                url: url
              });
          }
        });
      }
    });
    $scope.$on('fileupload:failed', function() {
      $scope.avatar_upload_state = '';
      $scope.portfolio_upload_state = '';
      return $scope.notify_error('Upload failed', false);
    });
    $scope.hasError = function(input) {
      return !input.$valid && (input.$dirty || $scope.submitted);
    };
    $scope.submitForm = function() {
      $scope.submitted = true;
      if ($rootScope.current_user.job_category_id === null) {
        return $scope.notify_error('Please select your job title from the list.');
      } else {
        if ($scope.form.$valid) {
          $scope.clear_notifications();
          return $rootScope.current_user.put().then((function(current_user) {
            $rootScope.current_user = current_user;
            return $scope.redirect_to("freelancers.show/" + current_user.id, {
              success: 'Your profile is updated successfully'
            });
          }), function() {
            window.scrollTo(0);
            return $scope.notify_error('Form has missing or invalid values');
          });
        } else {
          window.scrollTo(0);
          return angular.forEach($scope.form.$error, function(val, key) {
            return angular.forEach(val, function(inner_val) {
              var _ref;
              switch (key) {
                case 'required':
                  if (inner_val.$error.required === true) {
                    return $scope.notify_error("" + ((_ref = inner_val.$name) != null ? _ref.humanize() : void 0) + " is missing.");
                  } else if (angular.isArray(inner_val.$error.required)) {
                    return $scope.notify_error("" + (inner_val.$error.required[0].$name.humanize()) + " is missing");
                  }
                  break;
                case 'email':
                  if (inner_val.$error.email === true) {
                    return $scope.notify_error("" + inner_val.$viewValue + " is not a valid email.");
                  } else if (angular.isArray(inner_val.$error.email)) {
                    return $scope.notify_error("" + inner_val.$error.email[0].$viewValue + " is not a valid email.");
                  }
                  break;
                case 'url':
                  if (inner_val.$error.url === true) {
                    return $scope.notify_error("" + inner_val.$viewValue + " is not a valid url.");
                  } else if (angular.isArray(inner_val.$error.url)) {
                    return $scope.notify_error("" + inner_val.$error.url[0].$viewValue + " is not a valid url.");
                  }
              }
            });
          });
        }
      }
    };
    $scope.removePortfolio = function(index) {
      return $rootScope.current_user.portfolios.splice(index, 1);
    };
    $scope.addPortfolio = function() {
      console.log($rootScope.current_user.portfolios);
      $rootScope.current_user.portfolios.push({
        name: '',
        url: '',
        description: ''
      });
      return console.log($rootScope.current_user.portfolios);
    };
    init = function() {
      var _ref, _ref1;
      $scope.submitted = false;
      $scope.job_categories = job_categories;
      $scope.jobTitles = {
        Writing: _.uniq(['Scriptwriter', 'Writer', 'Copywriter', 'Journalist', 'Editor']),
        Design: _.uniq(["Product Designer", "Graphic Designer", "Multimedia Designer", "Motion Graphic Designer", "Art Director", "Creative Director", "Set Designer", "Wardrode Designer", "Web Designer"]),
        Production: _.uniq(["2D & 3D Animator", "Illustrator", "Video Producer", "Director", "Soundman", "Lightingman", "Videographer", "Cameraman", "Grip & Gaffer", "Production Manager", "Location Manager", "Director", "Video Editor", "3D Artist", "Photographer", "DI Artist", "Audio Producer", "Project Manager"]),
        Others: _.uniq(['Voice-over Artist', 'Translator', 'Marketing', 'PR'])
      };
      if (!((_ref = $rootScope.current_user.portfolios) != null ? _ref.length : void 0) > 0) {
        $rootScope.current_user.portfolios = [];
      }
      if (!((_ref1 = $rootScope.current_user.portfolio_images) != null ? _ref1.length : void 0) > 0) {
        return $rootScope.current_user.portfolio_images = [];
      }
    };
    return init();
  }
]);
angular.module('dashboard').config([
  '$routeProvider', 'WardenProvider', function($routeProvider, WardenProvider) {
    return WardenProvider.simplify($routeProvider).set_template_prefix('views/dashboard').require_user().omit_controller().when('dashboard.employer').when('dashboard.employer.notifications', {
      omitController: false
    }).when('dashboard.employer.completed_projects').when('dashboard.employer.pending_projects').when('dashboard.employer.active_projects').when('dashboard.employer.profile', {
      omitController: false
    }).when('dashboard.create_project').when('dashboard.edit_project/:id').when('dashboard.freelancer').when('dashboard.freelancer.notifications', {
      omitController: false
    }).when('dashboard.freelancer.offered_projects').when('dashboard.freelancer.bid_projects').when('dashboard.freelancer.active_projects').when('dashboard.freelancer.completed_projects').when('dashboard.freelancer.profile', {
      omitController: false,
      resolves: ['job_categories']
    });
  }
]);
angular.module('dashboard').directive('employerActiveProjects', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/dashboard/employer.active_projects.html'
    };
  }
]);
angular.module('dashboard').directive('employerCompletedProjects', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/dashboard/employer.completed_projects.html'
    };
  }
]);
angular.module('dashboard').directive('employerPendingProjects', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/dashboard/employer.pending_projects.html',
      controller: [
        '$scope', function($scope) {
          return $scope.fulfillBid = function(bidder, project) {
            return console.log(project);
          };
        }
      ]
    };
  }
]);
angular.module('dashboard').directive('freelancerActiveProjects', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/dashboard/freelancer.active_projects.html'
    };
  }
]);
angular.module('dashboard').directive('freelancerBidProjects', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/dashboard/freelancer.bid_projects.html'
    };
  }
]);
angular.module('dashboard').directive('freelancerCompletedProjects', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/dashboard/freelancer.completed_projects.html'
    };
  }
]);
angular.module('dashboard').directive('freelancerOfferedProjects', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/dashboard/freelancer.offered_projects.html'
    };
  }
]);
angular.module('dashboard').directive('projectForm', [
  function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        type: '@',
        user: '='
      },
      templateUrl: 'forms/dashboard/project.html',
      controller: [
        '$scope', 'JobCategory', 'Project', '$rootScope', '$routeParams', function($scope, JobCategory, Project, $rootScope, $routeParams) {
          var init;
          $scope.hasError = function(input) {
            return !input.$valid && (input.$dirty || $scope.submitted);
          };
          $scope.submitForm = function() {
            var promise, success_msg;
            $scope.submitted = true;
            if ($scope.form.$valid) {
              $rootScope.clear_notifications();
              switch ($scope.type) {
                case 'new':
                  promise = Project.create($scope.project, {
                    notify_success: false
                  });
                  success_msg = 'Project created successfully';
                  break;
                case 'edit':
                  promise = $scope.project.put();
                  success_msg = 'Project updated successfully';
              }
              return promise.then((function(project) {
                return $rootScope.redirect_to("projects.show/" + project.id, {
                  success: success_msg
                });
              }), function() {
                return $rootScope.notify_error('Form has missing or invalid values');
              });
            } else {
              return $rootScope.notify_error('Form has missing or invalid values');
            }
          };
          init = function() {
            $scope.submitted = false;
            $scope.job_categories = JobCategory.all();
            switch ($scope.type) {
              case 'new':
                $scope.project = {
                  employer_id: $scope.user.id
                };
                break;
              case 'edit':
                Project.find($routeParams.id).then(function(project) {
                  return $scope.project = project;
                });
            }
            return $scope.budget_ranges = ['S$0 - S$500', 'S$500 - S$1000', 'S$1000 - S$2000', 'S$2000 - S$3000', 'S$3000 - S$5000', 'S$5000 - S$10000'];
          };
          return init();
        }
      ]
    };
  }
]);
angular.module('pages').controller('ContactCtrl', [
  '$scope', 'Mailer', function($scope, Mailer) {
    return $scope.submitForm = function() {
      console.log($scope.contact);
      return Mailer.contact_us($scope.contact).then(function() {
        return $scope.notify_success("Thank you for contacting us. We will get back to you shortly");
      });
    };
  }
]);
angular.module('pages').controller('HomeCtrl', [
  '$scope', 'freelancers', function($scope, freelancers) {
    $scope.freelancers_start = freelancers.slice(0, 4);
    return $scope.freelancers_end = freelancers.slice(4);
  }
]);
angular.module('pages').config([
  '$routeProvider', 'WardenProvider', function($routeProvider, WardenProvider) {
    return WardenProvider.simplify($routeProvider).set_template_prefix('views/pages').when('home', {
      resolves: ['freelancers']
    }).when('about', {
      omitController: true
    }).when('contact').when('terms', {
      omitController: true
    }).when('privacy', {
      omitController: true
    });
  }
]);
angular.module('pages').factory('Mailer', [
  'Restangular', '$rootScope', function(Restangular) {
    var Mailer;
    Mailer = (function() {
      function Mailer() {}

      Mailer.prototype.contact_us = function(form_values) {
        return Restangular.all('mailer').customPOST('contact_us', {
          form_values: form_values
        });
      };

      return Mailer;

    })();
    return new Mailer;
  }
]);
angular.module('platform').controller('FreelancersCtrl', [
  '$scope', 'Freelancer', 'job_categories', '$route', function($scope, Freelancer, job_categories, $route) {
    var init,
      _this = this;
    $scope.$watch('query.conditions.job_title', function(new_val) {
      return angular.forEach($scope.jobTitles, function(cat_value, cat_key) {
        return angular.forEach(cat_value, function(value) {
          if (angular.equals(new_val, value)) {
            return $scope.current_job_category = cat_key;
          }
        });
      });
    });
    $scope.$on('search:menu', function(e, result) {
      if (result.selected === false) {
        delete $scope.query.conditions.job_title;
        return $scope.current_job_title = 'All';
      } else {
        $scope.query.conditions.job_title = result.selected;
        return $scope.current_job_title = result.selected;
      }
    });
    $scope.$on('search:input', function(e, search_text) {
      if ((search_text != null) && search_text.length > 0) {
        return $scope.query.search = search_text;
      } else {
        return delete $scope.query.search;
      }
    });
    this.refreshList = function() {
      Freelancer.count($scope.query).then((function(count) {
        $scope.total_results = count;
        return $scope.total_pages = Math.ceil(count / $scope.query.per_page);
      }), function() {
        return $scope.notify_error('Unable to fetch count from server');
      });
      return Freelancer.all($scope.query).then((function(freelancers) {
        return $scope.freelancers = freelancers;
      }), function() {
        return $scope.notify_error('Unable to fetch result from server');
      });
    };
    $scope.clearFilters = function() {
      return $route.reload();
    };
    init = function() {
      $scope.jobTitles = {
        Writing: _.uniq(['Scriptwriter', 'Writer', 'Copywriter', 'Journalist', 'Editor']),
        Design: _.uniq(["Product Designer", "Graphic Designer", "Multimedia Designer", "Motion Graphic Designer", "Art Director", "Creative Director", "Set Designer", "Wardrode Designer", "Web Designer"]),
        Production: _.uniq(["2D & 3D Animator", "Illustrator", "Video Producer", "Director", "Soundman", "Lightingman", "Videographer", "Cameraman", "Grip & Gaffer", "Production Manager", "Location Manager", "Director", "Video Editor", "3D Artist", "Photographer", "DI Artist", "Audio Producer", "Project Manager"]),
        Others: _.uniq(['Voice-over Artist', 'Translator', 'Marketing', 'PR'])
      };
      $scope.current_job_title = 'All';
      $scope.current_job_category = 'All';
      $scope.query = {};
      $scope.query.search = '';
      $scope.query.page = 1;
      $scope.query.per_page = 5;
      $scope.query.conditions = {
        profile_incomplete: false
      };
      $scope.job_categories = job_categories;
      $scope.$watch('query', function(new_value, old_value, scope) {
        if (new_value.page === old_value.page) {
          scope.query.page = 1;
        }
        return _this.refreshList();
      }, true);
      return _this.refreshList();
    };
    return init();
  }
]);
angular.module('platform').controller('FreelancersShowCtrl', [
  '$scope', 'freelancer', 'Project', function($scope, freelancer, Project) {
    $scope.freelancer = freelancer;
    return $scope.offerProject = function() {
      return Project.add_offer($scope.offering_project_id, freelancer.id).then(function(res) {
        console.log(res);
        return $scope.notify_success('Project offered');
      }, function(response) {
        console.log(response);
        return alert('fai');
      });
    };
  }
]);
angular.module('platform').controller('ProjectsCtrl', [
  '$scope', 'Project', 'job_categories', '$route', function($scope, Project, job_categories, $route) {
    var init,
      _this = this;
    $scope.$on('search:menu', function(e, result) {
      switch (result.name) {
        case 'job_categories':
          if (result.selected === false) {
            delete $scope.query.conditions.job_category_id;
            return $scope.current_job_category = 'All';
          } else {
            $scope.query.conditions.job_category_id = result.selected.id;
            return $scope.current_job_category = result.selected.name;
          }
          break;
        case 'budget_range':
          if (result.selected === false) {
            return delete $scope.query.conditions.budget_range;
          } else {
            return $scope.query.conditions.budget_range = result.selected;
          }
      }
    });
    $scope.$on('search:input', function(e, search_text) {
      if ((search_text != null) && search_text.length > 0) {
        return $scope.query.search = search_text;
      } else {
        return delete $scope.query.search;
      }
    });
    this.refreshList = function() {
      Project.count($scope.query).then((function(count) {
        $scope.total_results = count;
        return $scope.total_pages = Math.ceil(count / $scope.query.per_page);
      }), function() {
        return $scope.notify_error('Unable to fetch count from server');
      });
      return Project.all($scope.query).then((function(projects) {
        return $scope.projects = projects;
      }), function() {
        return $scope.notify_error('Unable to fetch result from server');
      });
    };
    $scope.clearFilters = function() {
      return $route.reload();
    };
    init = function() {
      $scope.current_job_category = 'All';
      $scope.budget_ranges = ['S$0 - S$500', 'S$500 - S$1000', 'S$1000 - S$2000', 'S$2000 - S$3000', 'S$3000 - S$5000', 'S$5000 - S$10000'];
      $scope.query = {};
      $scope.query.search = '';
      $scope.query.page = 1;
      $scope.query.per_page = 5;
      $scope.query.conditions = {
        project_status: 'project_pending'
      };
      $scope.job_categories = job_categories;
      $scope.$watch('query', function(new_value, old_value, scope) {
        if (new_value.page === old_value.page) {
          scope.query.page = 1;
        }
        return _this.refreshList();
      }, true);
      return _this.refreshList();
    };
    return init();
  }
]);
angular.module('platform').controller('ProjectsShowCtrl', [
  '$scope', 'project', 'Project', function($scope, project, Project) {
    $scope.project = project;
    $scope.selected_bidder_id = null;
    $scope.userEmployed = project.freelancer_id === $scope.current_user.id;
    $scope.userIsEmployer = project.employer_id === $scope.current_user.id;
    $scope.userOffered = _.contains(project.offer_ids, $scope.current_user.id);
    $scope.userBidded = _.contains(project.bidder_ids, $scope.current_user.id);
    $scope.userCanBid = !$scope.userEmployed && !$scope.userBidded && !$scope.userOffered;
    $scope.bidProject = function() {
      return Project.add_bidder(project.id, $scope.current_user.id).then(function(project) {
        $scope.project = project;
        $scope.userOffered = false;
        $scope.userBidded = true;
        $scope.userCanBid = false;
        return $scope.notify_success('Your bid has been placed');
      }, function(res) {
        console.log(res);
        return $scope.notify_error('Something wrong..');
      });
    };
    $scope.deleteProject = function() {
      var promise;
      promise = Project.destroy(project.id, {
        delegate: true
      });
      return promise.then(function() {
        return $scope.redirect_to('projects', {
          success: 'Your project is deleted'
        });
      }, function() {
        return $scope.notify_error('Unable to delete this project');
      });
    };
    $scope.completeProject = function() {
      return Project.mark_as_complete(project.id).then(function() {
        return $scope.redirect_to('projects', {
          success: 'Your project is now completed'
        });
      }, function(error) {
        var _ref, _ref1;
        console.log(error);
        if (((_ref = error.data) != null ? _ref.message : void 0) != null) {
          return $scope.notify_error((_ref1 = error.data) != null ? _ref1.message : void 0);
        }
      });
    };
    $scope.acceptOffer = function() {
      return Project.accept_offer(project.id, $scope.current_user.id).then(function(project) {
        $scope.project = project;
        $scope.userOffered = false;
        $scope.userBidded = false;
        $scope.userEmployed = true;
        $scope.userCanBid = false;
        return $scope.notify_success('You accepted the offer.');
      }, function(res) {
        console.log(res);
        return $scope.notify_error('Something wrong...');
      });
    };
    return $scope.acceptBid = function(selected) {
      console.log(selected);
      if (selected === null) {
        return $scope.notify_error('Please select a bidder from the list');
      } else {
        return Project.accept_bid(project.id, selected).then(function(project) {
          $scope.project = project;
          $scope.userOffered = false;
          $scope.userBidded = false;
          $scope.userCanBid = false;
          return $scope.notify_success('You accepted the bid.');
        }, function(res) {
          console.log(res);
          return $scope.notify_error('Something wrong...');
        });
      }
    };
  }
]);
angular.module('platform').directive('jobCategoriesFilter', [
  function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/platform/job_categories_filter.html',
      scope: {},
      controller: [
        '$scope', function($scope) {
          return $scope.setJobTitle = function($event) {
            console.log($event.target.innerHTML);
            return $scope.$emit('search:menu', {
              name: 'job_title',
              selected: $event.target.innerHTML
            });
          };
        }
      ]
    };
  }
]);
angular.module('platform').directive('searchMenu', [
  function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/platform/search.menu.html',
      scope: {
        name: '@',
        options: '@'
      },
      controller: [
        '$scope', '$parse', '$attrs', function($scope, $parse, $attrs) {
          var OPTIONS_REGEXP, list_item, match, name, options, valueName, valuesFn;
          name = $attrs.name;
          options = $attrs.options;
          OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/;
          if (!(match = options.match(OPTIONS_REGEXP))) {
            throw Error("Expected options in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" + " but got '" + options + "'.");
          }
          $scope.displayFn = $parse(match[2] || match[1]);
          valueName = match[4] || match[6];
          $scope.valueFn = $parse((match[2] ? match[1] : valueName));
          valuesFn = $parse(match[7]);
          $scope.list = (function() {
            var _i, _len, _ref, _results;
            _ref = valuesFn($scope.$parent);
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              list_item = _ref[_i];
              _results.push({
                item: list_item
              });
            }
            return _results;
          })();
          console.log(name);
          return $scope.select = function(selected) {
            return $scope.$emit('search:menu', {
              name: name,
              selected: selected
            });
          };
        }
      ]
    };
  }
]);
angular.module('platform').directive('searchInput', [
  '$timeout', function($timeout) {
    return {
      restrict: 'A',
      controller: [
        '$scope', '$element', function($scope, $element) {
          $scope.$on('search:trigger', function() {
            return $scope.search();
          });
          return $scope.search = function() {
            return $scope.$emit('search:input', $element.val());
          };
        }
      ],
      link: function(scope, element) {
        var timer;
        timer = null;
        return element.keyup(function() {
          $timeout.cancel(timer);
          return timer = $timeout((function() {
            return scope.search();
          }), 500);
        });
      }
    };
  }
]);

angular.module('platform').directive('searchButton', [
  function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        return element.click(function() {
          return scope.$emit('search:trigger');
        });
      }
    };
  }
]);
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

angular.module('account').factory('Employer', [
  'Restangular', '$rootScope', '$filter', function(Restangular, $rootScope, $filter) {
    var Model, _ref;
    Model = (function(_super) {
      __extends(Model, _super);

      function Model() {
        _ref = Model.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return Model;

    })(BaseModel);
    return new Model(Restangular, $rootScope, $filter, 'employer', 'employers');
  }
]);
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

angular.module('account').factory('Freelancer', [
  'Restangular', '$rootScope', '$filter', function(Restangular, $rootScope, $filter) {
    var Model, _ref;
    Model = (function(_super) {
      __extends(Model, _super);

      function Model() {
        _ref = Model.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return Model;

    })(BaseModel);
    return new Model(Restangular, $rootScope, $filter, 'freelancer', 'freelancers');
  }
]);
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

angular.module('platform').factory('JobCategory', [
  'Restangular', '$rootScope', '$filter', function(Restangular, $rootScope, $filter) {
    var Model, _ref;
    Model = (function(_super) {
      __extends(Model, _super);

      function Model() {
        _ref = Model.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return Model;

    })(BaseModel);
    return new Model(Restangular, $rootScope, $filter, 'job_category', 'job_categories');
  }
]);
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

angular.module('platform').factory('Project', [
  'Restangular', '$rootScope', '$filter', function(Restangular, $rootScope, $filter) {
    var Model, _ref;
    Model = (function(_super) {
      __extends(Model, _super);

      function Model() {
        _ref = Model.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Model.prototype.add_bidder = function(project_id, user_id) {
        return Restangular.one('projects', project_id).customPOST('add_bidder', {
          user_id: user_id
        });
      };

      Model.prototype.add_offer = function(project_id, user_id) {
        return Restangular.one('projects', project_id).customPOST('add_offer', {
          user_id: user_id
        });
      };

      Model.prototype.accept_offer = function(project_id, user_id) {
        return Restangular.one('projects', project_id).customPOST('accept_offer', {
          user_id: user_id
        });
      };

      Model.prototype.accept_bid = function(project_id, user_id) {
        return Restangular.one('projects', project_id).customPOST('accept_bid', {
          user_id: user_id
        });
      };

      Model.prototype.mark_as_complete = function(project_id) {
        return Restangular.one('projects', project_id).customPUT('mark_as_complete');
      };

      return Model;

    })(BaseModel);
    return new Model(Restangular, $rootScope, $filter, 'project', 'projects');
  }
]);
angular.module('platform').config([
  '$routeProvider', 'WardenProvider', function($routeProvider, WardenProvider) {
    return WardenProvider.simplify($routeProvider).set_template_prefix('views/platform').when('projects.show/:id', {
      resolves: ['project']
    }).when('projects', {
      resolves: ['job_categories']
    }).when('freelancers.show/:id', {
      resolves: ['freelancer'],
      user: true
    }).when('freelancers', {
      resolves: ['job_categories']
    });
  }
]);
resolvables['freelancer'] = [
  'Freelancer', '$route', function(Freelancer, $route) {
    var id;
    id = $route.current.params['id'];
    return Freelancer.find(id);
  }
];
resolvables['freelancers'] = [
  'Freelancer', function(Freelancer) {
    return Freelancer.all({
      conditions: {
        profile_incomplete: false
      },
      per_page: 8
    });
  }
];
resolvables['job_categories'] = [
  'JobCategory', function(JobCategory) {
    return JobCategory.all();
  }
];
resolvables['project'] = [
  '$q', 'Project', '$route', '$rootScope', function($q, Project, $route, $rootScope) {
    var id, promise;
    id = $route.current.params['id'];
    promise = Project.find(id, {
      delegate: true
    });
    return promise.then(function(project) {
      return project;
    }, function(error) {
      $rootScope.redirect_to('projects', {
        error: 'Project cannot be found'
      });
      return $q.reject(error);
    });
  }
];
