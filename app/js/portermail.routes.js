p.router.add('/inbox', views.inbox, 'inbox', true);
p.router.add('/', views.dashboard, 'dashboard', true);

p.router.trigger();