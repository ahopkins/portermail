p.router.add('/inbox', views.inbox, true);
p.router.add('/', views.dashboard, true);

p.router.trigger();