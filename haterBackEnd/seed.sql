-- This creates and connects the hater DB

\c hater

INSERT INTO hater_app_user_profile(id, name, tag, user_id) 
VALUES (21, 'evan', '@em', 4),(22, 'jeff', '@jl', 5);
-- (23, 'lawrence', '@ly', 3 ), (24, 'george', '@gc', 4), 
-- (25, 'jefe', '@jp', 5), (26, 'david', '@dw', 6),
-- (27, 'leon', '@lt', 7),(28, 'laura', '@lt', 8),(29, 'mustafa', '@mb', 9),
-- (30, 'art', '@as', 10);

-- Seeds the accounts first hates

INSERT INTO hater_app_hates(id, haters_id, h_body) 
VALUES (101, 21, 'I hate dogs'), (102, 22, 'I hate pork');
-- (103, 3, 'I hate babys'), (104, 4, 'I hate parks'), (105, 5, 'I hate you'),
-- (106, 6, 'I hate jimmy fallon'), (107, 7, 'I hate summer'), (108, 8, 'i hate cats'), (109, 9, 'I hate vegetables'), (110, 10, 'I hate hot sauce');

-- Seeds criticism

INSERT INTO hater_app_criticism(id, haters_id, c_body, hates_id) 
VALUES (201, 21, 'wow...', 101), (202, 22, 'that unamerican', 102);
-- (203, 3, 'grow up', 109), (204, 4, 'summer is the best', 107),
-- (205, 5, 'get out', 105), (206, 6, 'better not have kids then', 103), (207, 7, 'dont watch him then', 106), (208, 8, 'why no like cat?', 108),
-- (209, 9, 'weak', 110),(210, 10, 'stay out then', 104);


-- Seeds followers

INSERT INTO hater_app_follower(id, hater_being_followed_id, hater_following_id)
VALUES (301, 21, 22), (304, 22, 21)
-- (302, 1, 3), (303, 1, 4), (304, 2, 1), (305, 3, 1);
