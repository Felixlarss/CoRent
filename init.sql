-- create tables

CREATE TABLE house (
  house_id SERIAL NOT NULL PRIMARY KEY, 
  house_name VARCHAR(50) NOT NULL,
  house_rent DECIMAL NOT NULL,
  house_m2 DECIMAL NOT NULL
);

CREATE TABLE room (
  room_id SERIAL NOT NULL PRIMARY KEY,
  room_house_id INT NOT NULL,
  room_name VARCHAR(50) NOT NULL UNIQUE,
  room_m2 DECIMAL NOT NULL,
  CONSTRAINT fk_house 
    FOREIGN KEY (room_house_id)
      REFERENCES house(house_id)
);

CREATE TABLE member (
  member_id SERIAL NOT NULL PRIMARY KEY,
  member_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE member_room (
  member_id SERIAL NOT NULL,
  room_id SERIAL NOT NULL,
  CONSTRAINT fk_room
    FOREIGN KEY (room_id)
      REFERENCES room(room_id) ON DELETE CASCADE,
  CONSTRAINT fk_member
    FOREIGN KEY (member_id)
      REFERENCES member(member_id) ON DELETE CASCADE
);

-- house


-- get house
SELECT
  house_id,
  house_name AS name,
  house_rent AS rent,
  house_m2 AS area, 
  round(house_rent / house_m2, 2) AS Kr_per_m2,
  count(member_id) AS Tennents, 
  house_m2 - SUM(member_m2) AS common_area
FROM house
INNER JOIN member on house.house_id = member.member_house_id
WHERE house_id = 1
GROUP BY house_id;

-- post house
INSERT INTO 
  house (house_name, house_rent, house_m2)
VALUES 
  ( 'hallonet', 31000, 187 );

-- alter house
UPDATE house
SET
  house_name = 'Hallonhuset'
WHERE house_name = 'hallonet';

-- delete house
DELETE FROM house
  WHERE house_id = 2;

-- room 

-- get all rooms
-- get a room
-- post a room

INSERT INTO
  room (room_name, room_m2, room_house_id)
VALUES 
  ( 'Turtwig', 15.86, 1 ),
  ( 'Sandshrew', 9.80, 1),
  ( 'Magikarp', 21.03, 1),
  ( 'Gyarados', 13.01, 1),
  ( 'Charizard', 8.35, 1 ),
  ( 'Snorlax', 8.25, 1),
  ( 'Garderob_left', 2.1, 1),
  ( 'Garderob_Right', 2.1, 1 );



-- update a room
-- delete a room

-- member


-- get all members

SELECT
  m.member_id AS id,
  m.member_name AS name,
  r.room_m2 AS area,
  round (
  (((h.house_m2 - (SUM(r.room_m2) OVER ())) / count(m.member_id) OVER ())
  + r.room_m2 / count(m.member_id) OVER (PARTITION BY r.room_id)
  )
  * (h.house_rent / h.house_m2),
  2) AS rent
FROM member m
INNER JOIN room r on m.member_room_id = r.room_id
INNER JOIN house h on r.room_house_id = h.house_id
ORDER BY member_id;

-- get a member
SELECT * FROM(
SELECT
  member_id AS id,
  member_name AS name,
  room_m2 AS area, 
  round (
  (((house_m2 - (SUM(member_m2) OVER ())) / count(member_id) over ())
  + member_m2)
  * (house_rent / house_m2),
  2) AS rent
FROM member
INNER JOIN house on member.member_house_id = house.house_id
ORDER BY member_id
) t WHERE id = 1;

-- post members
INSERT INTO 
  member (member_name) 
VALUES 
  ( 'Caspar'),
  ( 'Elinore'),
  ( 'Benjamin'),
  ( 'Felix'),
  ( 'Rasmus'),
  ( 'Malin');

-- post member

INSERT INTO 
  member (member_name) 
VALUES 
  ( 'Pelle');
INSERT INTO
  member_room (member_id, room_id)
VALUES
  (7,6);

-- alter member
UPDATE member
SET
  member_m2 = (7.93 + 1.05)
WHERE member_name = 'Ebba';

-- delete member
DELETE FROM member
WHERE member_id = 6
RETURNING member_id, member_name;




-- member_room

-- add conection

INSERT INTO 
  member_room (member_id, room_id)
VALUES
  (1,3),
  (2,3),
  (3,1),
  (4,5),
  (4,7),
  (5,4),
  (6,2);

-- get all rooms and rent


WITH room_occupants AS (
  SELECT
    room_id,
    COUNT(*) AS occupants
  FROM member_room
  GROUP BY room_id
),

member_private_area AS (
  SELECT
    m.member_id,
    r.room_house_id AS house_id,
    COALESCE(r.room_m2 / ro.occupants, 0) AS private_m2
  FROM member m
  LEFT JOIN member_room mr
    ON m.member_id = mr.member_id
  LEFT JOIN room r
    ON r.room_id = mr.room_id
  LEFT JOIN room_occupants ro
    ON ro.room_id = r.room_id
),

member_private_sum AS (
  SELECT
    member_id,
    house_id,
    SUM(private_m2) AS private_m2
  FROM member_private_area
  GROUP BY member_id, house_id
),

house_common AS (
  SELECT
    h.house_id,
    h.house_rent,
    h.house_m2,
    COUNT(DISTINCT mps.member_id) AS members,
    h.house_m2 - SUM(mps.private_m2) AS common_m2
  FROM house h
  LEFT JOIN member_private_sum mps
    ON mps.house_id = h.house_id
  GROUP BY h.house_id, h.house_rent, h.house_m2
)

SELECT
  m.member_id,
  m.member_name,
  ROUND(COALESCE(mps.private_m2, 0), 2) AS member_m2,
  ROUND(
    (
      COALESCE(mps.private_m2, 0)
      +
      COALESCE(hc.common_m2, 0) / NULLIF(hc.members, 0)
    )
    * (hc.house_rent / hc.house_m2),
    2
  ) AS rent
FROM member m
LEFT JOIN member_private_sum mps
  ON m.member_id = mps.member_id
LEFT JOIN house_common hc
  ON hc.house_id = mps.house_id
ORDER BY m.member_id;





-- get one member rent and room







WITH room_occupants AS (
  SELECT
    room_id,
    COUNT(*) AS occupants
  FROM member_room
  GROUP BY room_id
),

member_private_area AS (
  SELECT
    m.member_id,
    r.room_house_id AS house_id,
    COALESCE(r.room_m2 / ro.occupants, 0) AS private_m2
  FROM member m
  LEFT JOIN member_room mr
    ON m.member_id = mr.member_id
  LEFT JOIN room r
    ON r.room_id = mr.room_id
  LEFT JOIN room_occupants ro
    ON ro.room_id = r.room_id
),

member_private_sum AS (
  SELECT
    member_id,
    house_id,
    SUM(private_m2) AS private_m2
  FROM member_private_area
  GROUP BY member_id, house_id
),

house_common AS (
  SELECT
    h.house_id,
    h.house_rent,
    h.house_m2,
    COUNT(DISTINCT mps.member_id) AS members,
    h.house_m2 - SUM(mps.private_m2) AS common_m2
  FROM house h
  LEFT JOIN member_private_sum mps
    ON mps.house_id = h.house_id
  GROUP BY h.house_id, h.house_rent, h.house_m2
)

SELECT
  m.member_id,
  m.member_name,
  ROUND(COALESCE(mps.private_m2, 0), 2) AS member_m2,
  ROUND(
    (
      COALESCE(mps.private_m2, 0)
      +
      COALESCE(hc.common_m2, 0) / NULLIF(hc.members, 0)
    )
    * (hc.house_rent / hc.house_m2),
    2
  ) AS rent
FROM member m
LEFT JOIN member_private_sum mps
  ON m.member_id = mps.member_id
LEFT JOIN house_common hc
  ON hc.house_id = mps.house_id
WHERE m.member_id = 1;



-- get rooms

SELECT room_id, room_name, room_m2 FROM room;
